import { FC } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { AvatarIcon } from "@/components/ui/avatar/Avatar";
import dayjs from "dayjs";
import { Comment } from "@/components/ui/post/comment/Comment";
import { Like } from "@/components/ui/post/like/Like";
import { Bookmark } from "@/components/ui/post/bookmark/Bookmark";
import { QUERY_KEY } from "@/utils/constants";
import { useGetPostById } from "@/hooks/post/usePost";
import { IPost } from "@/services/post/post.interface";
import { CreateComment } from "./create-comment/CreateComment";
import { Comments } from "./comments/Comments";

interface Props {
  params: { postId: string };
}

export const Post: FC<IPost> = (data) => {
  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="flex items-center gap-3 px-3 sm:px-4 ">
        <AvatarIcon isFollowing={false} user={data.user} />
        <div className="leading-4">
          <div className="font-bold">{data?.user.displayName}</div>
          <div className="text-sm">@{data?.user.userName}</div>
        </div>
      </div>
      <div className="px-3 sm:px-4">{data.text}</div>

      <div className="px-3 sm:px-4 text-sm w-fit hover:underline cursor-pointer">
        <TooltipProvider skipDelayDuration={0} disableHoverableContent>
          <Tooltip>
            <TooltipTrigger className="hover:underline">
              {dayjs(data.createdAt).format("h:MM A · DD ddd YYYY")}
            </TooltipTrigger>
            <TooltipContent
              className="px-2 py-0.5 text-xs font-light pointer-events-none select-none"
              side="bottom"
            >
              {dayjs(data.createdAt).format("h:MM A · DD ddd YYYY")}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex w-full gap-4 items-center py-1 text-muted-foreground no-link px-3 sm:px-4 border-y border-border">
        <Comment queryKey={QUERY_KEY.post_by_id} onClick={() => {}} count={data.commentsCount} />
        <Like
          invalidate="data"
          queryKey={QUERY_KEY.post_by_id}
          id={data.id}
          count={data.likesCount}
          isLiked={!!data.likes[0]}
        />
        <Bookmark
          invalidate="data"
          queryKey={QUERY_KEY.post_by_id}
          id={data.id}
          count={data.bookmarksCount}
          isMarked={!!data.bookmarks[0]}
        />
      </div>
      <CreateComment postId={data.id} />
      <Comments postId={data.id} />
    </div>
  );
};
