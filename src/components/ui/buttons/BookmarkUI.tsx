import { cn } from "@/utils/utils";
import { FC, HTMLAttributes } from "react";
import { TooltipForPost } from "../post/tooltip/TooltipForPost";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  count: number;
  isMarked: boolean;
  isLoading?: boolean;
}

export const BookmarkUI: FC<Props> = ({ count, isMarked, isLoading = false, ...attr }) => {
  return (
    <button
      //   onClick={bookmarkHandle}
      disabled={isLoading}
      {...attr}
      className={cn(
        "flex cursor-pointer items-center group px-2 w-fit col-start-5 col-end-6 disabled:opacity-50"
      )}
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
    </button>
  );
};
