"use client";
import { Post } from "@/components/ui/post/Post";
import { Spinner } from "@/components/ui/spinner/Spinner";
// import { useBookmarks } from "@/hooks/post/usePost";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { IBookmarks, IPostShort } from "@/services/post/post.interface";
import { PostService } from "@/services/post/post.service";
import { QUERY_KEY } from "@/utils/constants";
import { FC } from "react";
import { ImSpinner6 } from "react-icons/im";

interface Props {}

export const BookmarksItem: FC<Props> = () => {
  // const { data, isLoading, isError } = useBookmarks();
  // console.log("bookmarks", data);
  const fetchProjects = async ({ pageParam }: any) => {
    const res = await PostService.getBookmarks(pageParam);
    return res;
  };
  const { data, isFetchingNextPage } = useInfinityLoad<IBookmarks>({
    fetchDataFn: fetchProjects,
    queryKey: [QUERY_KEY.bookmarks],
  });
  // if (isLoading)
  // return (
  //   <div className="flex-1 flex flex-col justify-center items-center">
  //     <Spinner />
  //   </div>
  // );

  if (!data) return <div>data undefined</div>;

  return (
    <div className="flex-1 h-full">
      {!!data.pages.length ? (
        data.pages.map((page) => {
          return page.map((mark) => (
            <Post key={mark.id} queryKey={QUERY_KEY.bookmarks} {...mark.post} />
          ));
        })
      ) : (
        <div className="flex flex-col py-10 px-8 mobile:px-20 sm:px-32 justify-center">
          <div className="text-3xl mobile:text-5xl font-extrabold text-black">
            Save posts for later
          </div>
          <div>Bookmark posts to easily find them again in the future.</div>
        </div>
      )}
      {isFetchingNextPage ? (
        <div className="py-5 flex justify-center items-center gap-2">
          <ImSpinner6 className="animate-spin" />
          <span>Loading</span>
        </div>
      ) : null}
    </div>
  );
};
