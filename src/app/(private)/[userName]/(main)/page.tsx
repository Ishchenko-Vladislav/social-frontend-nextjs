"use client";
import { Post } from "@/components/ui/post/Post";
import { useGetProfilePosts } from "@/hooks/post/usePost";
import { QUERY_KEY } from "@/utils/constants";
import React, { FC } from "react";

interface Props {
  params: { userName: string };
}

const page: FC<Props> = ({ params }) => {
  const { data, isLoading } = useGetProfilePosts(params.userName);
  if (isLoading) return null;
  return (
    <div>
      {data &&
        !!data.length &&
        data?.map((post: any) => (
          <Post queryKey={QUERY_KEY.profile_posts} key={post.id} {...post} />
        ))}
    </div>
  );
};

export default page;
