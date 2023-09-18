"use client";
import { AvatarIcon } from "@/components/ui/avatar/Avatar";
import { HeaderBack } from "@/components/ui/header/HeaderBack";
import { useGetPostById } from "@/hooks/post/usePost";
import React, { FC } from "react";

interface Props {
  params: {
    userName: string;
    postId: string;
  };
}

const PostPage: FC<Props> = ({ params }) => {
  const { data, isLoading } = useGetPostById(params.postId);
  if (isLoading) return null;
  console.log("PostPage data", data);
  if (!data) return <div>this post dont exist</div>;
  return (
    <div>
      <HeaderBack title="Post" />
      <div className="flex items-center gap-3 px-4 py-2">
        <AvatarIcon isFollowing={false} user={data.user} />
        <div className="leading-4">
          <div>{data?.user.displayName}</div>
          <div>{data?.user.userName}</div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
