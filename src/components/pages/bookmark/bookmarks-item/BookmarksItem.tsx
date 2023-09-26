"use client";
import { Post } from "@/components/ui/post/Post";
import { Spinner } from "@/components/ui/spinner/Spinner";
import { useBookmarks } from "@/hooks/post/usePost";
import { QUERY_KEY } from "@/utils/constants";
import { FC } from "react";

interface Props {}

export const BookmarksItem: FC<Props> = () => {
  const { data, isLoading, isError } = useBookmarks();
  console.log("bookmarks", data);
  if (isLoading)
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );

  if (!data) return <div>data undefined</div>;

  return (
    <div className="flex-1 h-full">
      {!!data.length ? (
        data.map((mark) => <Post queryKey={QUERY_KEY.bookmarks} {...mark.post} />)
      ) : (
        <div className="flex flex-col py-10 px-8 mobile:px-20 sm:px-32 justify-center">
          <div className="text-3xl mobile:text-5xl font-extrabold text-black">
            Save posts for later
          </div>
          <div>Bookmark posts to easily find them again in the future.</div>
        </div>
      )}
    </div>
  );
};
