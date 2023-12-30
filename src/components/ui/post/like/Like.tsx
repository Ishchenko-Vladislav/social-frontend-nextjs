import { FC, HTMLAttributes, MouseEvent, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import cn from "classnames";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostService } from "@/services/post/post.service";
import { IPost } from "@/services/post/post.interface";
import { QUERY_KEY } from "@/utils/constants";
import { TooltipForPost } from "../tooltip/TooltipForPost";
import { IPagination } from "@/utils/types";
import { LikeUI } from "../../buttons/LikeUI";

interface Props {
  id: string;
  isLiked: boolean;
  count: number;
  queryKey: string;
}

export const Like: FC<Props> = ({ id, count, isLiked, queryKey }) => {
  const queryClient = useQueryClient();

  const { mutate: like, isPending } = useMutation({
    mutationFn: (id: string) => PostService.likePost(id),
    onSuccess: (updatedPost, variables, context) => {
      queryClient.setQueryData([queryKey], (data: IPagination<IPost>) => {
        return {
          pages: data.pages.map((page) => {
            return page.map((post) => {
              if (post.id === updatedPost.id) return updatedPost;
              else return post;
            });
          }),
          pageParams: data.pageParams,
        };
      });
    },
    onError(error, variables, context) {},
  });
  const likeHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    like(id);
  };
  return <LikeUI isLoading={isPending} onClick={likeHandle} count={count} isLiked={isLiked} />;
};
