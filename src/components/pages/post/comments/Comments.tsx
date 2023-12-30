"use client";
import { FC } from "react";
import { Comment } from "./comment/Comment";
import { CommentService } from "@/services/comment/comment.service";
import { QUERY_KEY } from "@/utils/constants";
import { IComment } from "@/services/comment/comment.interface";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { ImSpinner6 } from "react-icons/im";

interface Props {
  postId: string;
}

export const Comments: FC<Props> = ({ postId }) => {
  const fetchProjects = async ({ pageParam }: any) => {
    const res = await CommentService.getComments(postId, pageParam);
    return res as IComment[];
  };

  const { data, isFetchingNextPage } = useInfinityLoad<IComment>({
    fetchDataFn: fetchProjects,
    queryKey: [QUERY_KEY.comments],
  });

  return (
    <div className="w-full flex flex-col">
      {data && data.pages && data.pages.length > 0 ? (
        data.pages.map((page, indexPage) => {
          return page.map((comment) => {
            return <Comment key={comment.id} {...comment} />;
          });
        })
      ) : (
        <div></div>
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
