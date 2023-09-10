"use client";
import { useGetPosts } from "@/hooks/post/usePost";
import { FC } from "react";

interface Props {}

export const HomePosts: FC<Props> = () => {
  const { data, isError, isLoading } = useGetPosts();
  if (isLoading) return <div>Loading ...</div>;
  console.log("post", data);
  return (
    <div>
      {data && data.length ? (
        data.map((post) => <div>{post.text}</div>)
      ) : (
        <div className="text-center py-5 border-b border-border">
          <div className="text-xl">you're not currently subscribed to anyone</div>
          <div className="text-sm text-muted-foreground">
            when you start following someone, their posts will be here.
          </div>
        </div>
      )}
    </div>
  );
};