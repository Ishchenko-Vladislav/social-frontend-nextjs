import { LikeUI } from "@/components/ui/buttons/LikeUI";
import { IPost } from "@/services/post/post.interface";
import { PostService } from "@/services/post/post.service";
import { IPagination } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, HTMLAttributes, MouseEvent } from "react";
interface Props {
  id: string;
  isLiked: boolean;
  count: number;
  queryKey: string;
  // invalidate?: IInvalidate;
}

export const Like: FC<Props> = ({ count, id, isLiked, queryKey }) => {
  const queryClient = useQueryClient();

  const { mutate: like, isPending } = useMutation({
    mutationFn: (id: string) => PostService.likePost(id),
    onSuccess: (updatedPost, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      // queryClient.setQueryData([queryKey], (data: IPagination<IPost>) => {
      //   return {
      //     pages: data.pages.map((page) => {
      //       return page.map((post) => {
      //         if (post.id === updatedPost.id) return updatedPost;
      //         else return post;
      //       });
      //     }),
      //     pageParams: data.pageParams,
      //   };
      // });
      // if (invalidate === "cache") {
      //   queryClient.setQueriesData<IPost[]>([queryKey], (oldData) => {
      //     if (!oldData) return [];
      //     const updateData = oldData.map((el) => {
      //       if (el.id === updatedPost.id) {
      //         return { ...el, likesCount: updatedPost.likesCount, likes: updatedPost.likes };
      //       }
      //       return el;
      //     });
      //     return updateData;
      //   });
      // } else if (invalidate === "data") {
      //   queryClient.invalidateQueries([queryKey]);
      // }
    },
    onError(error, variables, context) {
      // setLiked((prev) => !prev);
      // setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    },
  });
  const likeHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    like(id);
  };
  return <LikeUI isLoading={isPending} onClick={likeHandle} count={count} isLiked={isLiked} />;
};
