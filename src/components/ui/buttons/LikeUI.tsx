import { cn } from "@/utils/utils";
import { FC, HTMLAttributes } from "react";
import { TooltipForPost } from "../post/tooltip/TooltipForPost";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isLiked: boolean;
  count: number;
  // invalidate?: IInvalidate;
}

export const LikeUI: FC<Props> = ({ count, isLiked, isLoading = false, ...attr }) => {
  return (
    <button
      disabled={isLoading}
      {...attr}
      className={cn("flex items-center cursor-pointer w-fit group px-2 disabled:opacity-50")}
    >
      <TooltipForPost show={isLiked ? "Unlike" : "Like"}>
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
    </button>
  );
};
