"use client";
import { useGetComments } from "@/hooks/comment/useComment";
import { FC } from "react";
import { Comment } from "./comment/Comment";

interface Props {
  postId: string;
}

export const Comments: FC<Props> = ({ postId }) => {
  const { data, isLoading, isError } = useGetComments(postId);
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>error</div>;
  }
  console.log("comments", data);
  return (
    <div className="w-full flex flex-col">
      {!!data.length ? (
        data.map((comment) => <Comment key={comment.id} {...comment} />)
      ) : (
        <div></div>
      )}
    </div>
  );
};
