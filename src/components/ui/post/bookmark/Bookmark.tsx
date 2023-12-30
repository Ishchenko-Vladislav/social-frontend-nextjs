import { FC, HTMLAttributes, MouseEvent, useState } from "react";
import cn from "classnames";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostService } from "@/services/post/post.service";
import { IPost } from "@/services/post/post.interface";
import { TooltipForPost } from "../tooltip/TooltipForPost";
import { IPagination } from "@/utils/types";
import { BookmarkUI } from "../../buttons/BookmarkUI";
type IInvalidate = "cache" | "data";
interface Props {
  id: string;
  count: number;
  isMarked: boolean;
  queryKey: string;
  invalidate?: IInvalidate;
}

export const Bookmark: FC<Props> = ({ id, count, isMarked, queryKey }) => {
  const queryClient = useQueryClient();

  const { mutate: bookmark, isPending } = useMutation({
    mutationFn: (id: string) => PostService.bookmark(id),
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
  const bookmarkHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    bookmark(id);
  };
  return (
    <BookmarkUI count={count} isMarked={isMarked} onClick={bookmarkHandle} isLoading={isPending} />
  );
};
