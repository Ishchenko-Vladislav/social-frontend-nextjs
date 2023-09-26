"use client";
import { AvatarIcon } from "@/components/ui/avatar/Avatar";
import { HeaderBack } from "@/components/ui/header/HeaderBack";
import { useGetPostById } from "@/hooks/post/usePost";
import React, { FC } from "react";
import dayjs from "dayjs";
import { Comment } from "@/components/ui/post/comment/Comment";
import { Like } from "@/components/ui/post/like/Like";
// import { Bookmark } from "@/components/pages/bookmark/Bookmark";
import { QUERY_KEY } from "@/utils/constants";
import { Bookmark } from "@/components/ui/post/bookmark/Bookmark";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { Post } from "@/components/pages/post/Post";

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
      <Post {...data} key={data.id} />
    </div>
  );
};

export default PostPage;
