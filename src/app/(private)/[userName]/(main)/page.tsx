"use client";
import { Post } from "@/components/ui/post/Post";
// import { useGetProfilePosts } from "@/hooks/post/usePost";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { IPostShort } from "@/services/post/post.interface";
import { PostService } from "@/services/post/post.service";
import { QUERY_KEY } from "@/utils/constants";
import React, { FC } from "react";
import { ImSpinner6 } from "react-icons/im";

interface Props {
  params: { userName: string };
}

const page: FC<Props> = ({ params }) => {
  // const { data, isLoading } = useGetProfilePosts(params.userName);
  // if (isLoading) return null;
  const fetchProjects = async ({ pageParam }: any) => {
    const res = await PostService.getProfilePosts(params.userName, pageParam);
    return res;
  };
  const { data, isFetchingNextPage } = useInfinityLoad<IPostShort>({
    fetchDataFn: fetchProjects,
    queryKey: [QUERY_KEY.profile_posts],
  });
  return (
    <div>
      {data && data.pages && data.pages.length > 0 && data.pages[0].length ? (
        data?.pages.map((page) => {
          return page.map((post) => (
            <Post queryKey={QUERY_KEY.profile_posts} key={post.id} {...post} />
          ));
        })
      ) : (
        <div className="text-center py-5 border-b border-border">
          <div className="text-xl">There are no posts</div>
          {/* <div className="text-sm text-muted-foreground">
            when you start following someone, their posts will be here.
          </div> */}
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

export default page;
