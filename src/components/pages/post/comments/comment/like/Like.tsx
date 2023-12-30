import { FC, HTMLAttributes, MouseEvent, MouseEventHandler } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
// import cn from "classnames";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/utils/constants";
import { TooltipForPost } from "@/components/ui/post/tooltip/TooltipForPost";
import { CommentService } from "@/services/comment/comment.service";
import { IComment } from "@/services/comment/comment.interface";
import { IPagination } from "@/utils/types";
import { cn } from "@/utils/utils";
import { LikeUI } from "@/components/ui/buttons/LikeUI";
// import { TooltipForPost } from "../tooltip/TooltipForPost";
type IInvalidate = "cache" | "data";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  id: string;
  isLiked: boolean;
  count: number;
  queryKey: string;
}

type f = {
  pages: IComment[][];
  pageParams: number[];
};

export const Like: FC<Props> = ({ id, count, isLiked, queryKey, ...attr }) => {
  const queryClient = useQueryClient();
  const { mutate: like, isPending } = useMutation({
    mutationFn: (id: string) => CommentService.likeToComment(id),
    onSuccess: (updatedComment, variables, context) => {
      queryClient.setQueryData([QUERY_KEY.comments], (data: IPagination<IComment>) => {
        return {
          pages: data.pages.map((page) => {
            return page.map((comment) => {
              if (comment.id === updatedComment.id) return updatedComment;
              else return comment;
            });
          }),
          pageParams: data.pageParams,
        };
      });
    },
  });
  const likeHandle = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (isPending) return null;
    e.stopPropagation();
    like(id);
  };
  return (
    <LikeUI count={count} isLiked={isLiked} onClick={likeHandle} isLoading={isPending} />
    // <button
    //   onClick={(e) => likeHandle(e)}
    //   disabled={isPending}
    //   {...attr}
    //   className={cn("flex items-center cursor-pointer group px-2 -ml-4 disabled:opacity-50")}
    // >
    //   <TooltipForPost show={isLiked ? "Don't like" : "Like"}>
    //     <div className={cn(`rounded-full p-2 group-hover:bg-pink-500/20 transition-colors`)}>
    //       {isLiked ? (
    //         <div>
    //           <AiFillHeart className={cn(`text-pink-500 sm:text-lg text-sm`)} />
    //         </div>
    //       ) : (
    //         <div>
    //           <AiOutlineHeart className={cn(`sm:text-lg text-sm group-hover:text-pink-500`)} />
    //         </div>
    //       )}
    //     </div>
    //   </TooltipForPost>
    //   <span
    //     className={cn(`text-sm group-hover:text-pink-500 select-none`, {
    //       ["text-pink-500"]: isLiked,
    //     })}
    //   >
    //     {count}
    //   </span>
    // </button>
  );
};
