import { FC, HTMLAttributes, MouseEvent } from "react";
import cn from "classnames";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostService } from "@/services/post/post.service";
import { IPost } from "@/services/post/post.interface";
import { TooltipForPost } from "../tooltip/TooltipForPost";
type IInvalidate = "cache" | "data";
interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string;
  count: number;
  isMarked: boolean;
  queryKey: string;
  invalidate?: IInvalidate;
}

export const Bookmark: FC<Props> = ({
  id,
  count,
  isMarked,
  queryKey,
  invalidate = "cache",
  ...attr
}) => {
  const queryClient = useQueryClient();

  const { mutate: bookmark } = useMutation({
    mutationFn: (id: string) => PostService.bookmark(id),
    onSuccess: (updatedPost, variables, context) => {
      if (invalidate === "cache") {
        queryClient.setQueriesData<IPost[]>([queryKey], (oldData) => {
          if (!oldData) return;
          const updateData = oldData.map((el) => {
            if (el.id === updatedPost.id) {
              return {
                ...el,
                bookmarks: updatedPost.bookmarks,
                bookmarksCount: updatedPost.bookmarksCount,
              };
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
  const bookmarkHandle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // console.log("bookmarkHandle");
    bookmark(id);
  };
  return (
    <div
      onClick={bookmarkHandle}
      {...attr}
      className={cn("flex cursor-pointer items-center group w-20 ml-auto")}
    >
      <TooltipForPost show={isMarked ? "Unbookmark" : "Bookmark"}>
        <div className={cn(`rounded-full p-2 group-hover:bg-blue-500/20 transition-colors`)}>
          {isMarked ? (
            <div>
              <FaBookmark className={cn(`text-blue-500 sm:text-lg text-sm`)} />
            </div>
          ) : (
            <div>
              <FaRegBookmark className={cn(`sm:text-lg text-sm group-hover:text-blue-500`)} />
            </div>
          )}
        </div>
      </TooltipForPost>
      <span
        className={cn(`text-sm group-hover:text-blue-500 select-none`, {
          ["text-blue-500"]: isMarked,
        })}
      >
        {count}
      </span>
    </div>
  );
};
