import { FC, HTMLAttributes, MouseEvent } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import cn from "classnames";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostService } from "@/services/post/post.service";
import { IPost } from "@/services/post/post.interface";
import { QUERY_KEY } from "@/utils/constants";
import { TooltipForPost } from "../tooltip/TooltipForPost";
type IInvalidate = "cache" | "data";

interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string;
  isLiked: boolean;
  count: number;
  queryKey: string;
  invalidate?: IInvalidate;
}

export const Like: FC<Props> = ({
  id,
  count,
  isLiked,
  queryKey,
  invalidate = "cache",
  ...attr
}) => {
  const queryClient = useQueryClient();

  const { mutate: like } = useMutation({
    mutationFn: (id: string) => PostService.likePost(id),
    onSuccess: (updatedPost, variables, context) => {
      if (invalidate === "cache") {
        queryClient.setQueriesData<IPost[]>([queryKey], (oldData) => {
          if (!oldData) return [];
          const updateData = oldData.map((el) => {
            if (el.id === updatedPost.id) {
              return { ...el, likesCount: updatedPost.likesCount, likes: updatedPost.likes };
            }
            return el;
          });
          return updateData;
        });
      } else if (invalidate === "data") {
        queryClient.invalidateQueries([queryKey]);
      }
    },
  });
  const likeHandle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log("likeHandle");
    like(id);
  };
  return (
    <div
      onClick={likeHandle}
      {...attr}
      className={cn("flex items-center cursor-pointer group w-20")}
    >
      <TooltipForPost show={isLiked ? "Don't like" : "Like"}>
        <div className={cn(`rounded-full p-2 group-hover:bg-pink-500/20 transition-colors`)}>
          {isLiked ? (
            <div>
              <AiFillHeart className={cn(`text-pink-500 sm:text-lg text-sm`)} />
            </div>
          ) : (
            <div>
              <AiOutlineHeart className={cn(`sm:text-lg text-sm group-hover:text-pink-500`)} />
            </div>
          )}
        </div>
      </TooltipForPost>
      <span
        className={cn(`text-sm group-hover:text-pink-500 select-none`, {
          ["text-pink-500"]: isLiked,
        })}
      >
        {count}
      </span>
    </div>
  );
};
