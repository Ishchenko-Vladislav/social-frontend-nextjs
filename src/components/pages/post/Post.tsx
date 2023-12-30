import { FC } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { AvatarIcon } from "@/components/ui/avatar/Avatar";
import dayjs from "dayjs";
import { Comment } from "@/components/ui/post/comment/Comment";
// import { Like } from "@/components/ui/post/like/Like";
// import { Bookmark } from "@/components/ui/post/bookmark/Bookmark";
import { QUERY_KEY } from "@/utils/constants";
import { useGetPostById } from "@/hooks/post/usePost";
import { IPost } from "@/services/post/post.interface";
import { CreateComment } from "./create-comment/CreateComment";
import { Comments } from "./comments/Comments";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { useFollow } from "@/hooks/user/useProfile";
import { Like } from "./like/Like";
import { Bookmark } from "./bookmark/Bookmark";
// import { Bookmark } from "../bookmark/Bookmark";

interface Props {
  params: { postId: string };
}

export const Post: FC<IPost> = (data) => {
  console.log("here data", data);
  // const { mutate } = useFollow({
  //   postId: data.id,
  // });
  const followHandle = () => {};
  return (
    <div className="flex flex-col gap-3 py-2">
      <div className="flex items-center gap-3 px-3 sm:px-4 ">
        <AvatarIcon isFollowing={!!data?.user?.followers} user={data.user} />
        <div className="leading-4">
          <div className="font-bold">{data?.user.displayName}</div>
          <div className="text-sm">@{data?.user.userName}</div>
        </div>
      </div>
      <div
        style={{
          wordBreak: "break-word",
        }}
        className="px-3 sm:px-4 whitespace-pre-wrap"
      >
        {data.text}
      </div>
      <div
        className={cn("grid gap-1 sm:gap-3 px-4", {
          ["grid-cols-1"]: data.attachment.length === 1,
          ["grid-cols-2 aspect-video  "]: data.attachment.length >= 2,
          ["grid-rows-2"]: data.attachment.length >= 3,
        })}
      >
        {data.attachment && !!data.attachment.length
          ? data.attachment.map((el, index) => (
              <div
                key={el.id}
                className={cn("w-full", {
                  ["row-span-2"]: data.attachment.length == 3 && index == 0,
                })}
              >
                {el.resourceType === "image" ? (
                  <div
                    className={cn("relative w-fit", {
                      ["w-full h-full"]: data.attachment.length >= 2,
                    })}
                  >
                    <Image
                      className={cn("max-w-full  h-auto rounded-2xl ", {
                        ["max-h-[500px] object-contain w-fit"]: data.attachment.length == 1,
                        ["w-full h-full object-cover"]: data.attachment.length >= 2,
                      })}
                      width={el.image?.width ?? 2000}
                      height={el.image?.height ?? 2000}
                      src={el.secureUrl ?? el.url ?? ""}
                      alt="image"
                    />
                  </div>
                ) : el.resourceType === "video" ? (
                  <video
                    controls
                    muted
                    autoPlay
                    loop
                    className="object-contain w-full aspect-square bg-black rounded-2xl h-full"
                  >
                    <source className="object-contain" src={el.url} />
                    <source className="object-contain" src={el.secureUrl} />
                  </video>
                ) : null}
              </div>
            ))
          : null}
      </div>

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
      <div className="grid grid-cols-5 w-full gap-4 items-center py-1 text-muted-foreground no-link px-3 sm:px-4 border-y border-border">
        <Comment queryKey={QUERY_KEY.post_by_id} onClick={() => {}} count={data.commentsCount} />
        <Like
          // invalidate="data"
          queryKey={QUERY_KEY.post_by_id}
          id={data.id}
          count={data.likesCount}
          isLiked={!!data.likes[0]}
        />
        <Bookmark
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
