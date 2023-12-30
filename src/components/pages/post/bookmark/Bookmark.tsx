import { BookmarkUI } from "@/components/ui/buttons/BookmarkUI";
import { PostService } from "@/services/post/post.service";
import { IPagination } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, MouseEvent } from "react";

interface Props {
  id: string;
  count: number;
  isMarked: boolean;
  queryKey: string;
}

export const Bookmark: FC<Props> = ({ count, id, isMarked, queryKey }) => {
  const queryClient = useQueryClient();

  const { mutate: bookmark, isPending } = useMutation({
    mutationFn: (id: string) => PostService.bookmark(id),
    onSuccess: (updatedPost, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });

      // if (invalidate === "cache") {
      //   queryClient.setQueriesData<IPost[]>([queryKey], (oldData) => {
      //     if (!oldData) return;
      //     const updateData = oldData.map((el) => {
      //       if (el.id === updatedPost.id) {
      //         return {
      //           ...el,
      //           bookmarks: updatedPost.bookmarks,
      //           bookmarksCount: updatedPost.bookmarksCount,
      //         };
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
      // setMarked((prev) => !prev);
      // setMarkedCount((prev) => (marked ? prev - 1 : prev + 1));
    },
  });
  const bookmarkHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // console.log("bookmarkHandle");
    // setMarked((prev) => !prev);
    // setMarkedCount((prev) => (marked ? prev - 1 : prev + 1));
    bookmark(id);
  };
  return (
    <BookmarkUI count={count} isMarked={isMarked} onClick={bookmarkHandle} isLoading={isPending} />
  );
};
