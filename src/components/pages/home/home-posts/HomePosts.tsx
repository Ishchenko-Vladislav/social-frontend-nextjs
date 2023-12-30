"use client";
import { Post } from "@/components/ui/post/Post";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { IPostShort } from "@/services/post/post.interface";
import { PostService } from "@/services/post/post.service";
import { QUERY_KEY } from "@/utils/constants";
import { FC } from "react";
import { ImSpinner6 } from "react-icons/im";
interface Props {}

export const HomePosts: FC<Props> = () => {
  const fetchProjects = async ({ pageParam }: any) => {
    const res = await PostService.getFollowingPosts(pageParam);
    return res;
  };
  const { data, isFetchingNextPage, isPending } = useInfinityLoad<IPostShort>({
    fetchDataFn: fetchProjects,
    queryKey: [QUERY_KEY.following_posts],
  });

  if (isPending) {
    return (
      <div className="py-5 flex justify-center items-center gap-2">
        <ImSpinner6 className="animate-spin" />
        <span>Loading</span>
      </div>
    );
  }

  return (
    <div>
      {data && data.pages && data.pages.length > 0 && data.pages[0].length > 0 ? (
        data.pages.map((page) => {
          return page.map((post) => {
            return <Post queryKey={QUERY_KEY.following_posts} key={post.id} {...post} />;
          });
        })
      ) : (
        <div className="text-center py-5 border-b border-border">
          <div className="text-xl">you're not currently subscribed to anyone</div>
          <div className="text-sm text-muted-foreground">
            when you start following someone, their posts will be here.
          </div>
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
