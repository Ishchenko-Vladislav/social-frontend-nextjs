"use client";
import { IPostShort } from "@/services/post/post.interface";
import { FC, MouseEvent, HTMLAttributes, PropsWithChildren } from "react";
import { AvatarIcon, UserHover } from "../avatar/Avatar";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useRouter } from "next/navigation";
import cn from "classnames";
import Link from "next/link";
import { IconType } from "react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostService } from "@/services/post/post.service";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shadcn/ui/hover-card";
import { IUser } from "@/services/user/user.interface";
// import { useStatus } from "@/hooks/user/useStatus";
import { QUERY_KEY } from "@/utils/constants";
import { Like } from "./like/Like";
import { Comment } from "./comment/Comment";
import { Bookmark } from "./bookmark/Bookmark";
import { TimePost } from "./time-post/TimePost";
interface Props extends IPostShort {
  queryKey: string;
}

export const Post: FC<Props> = ({ queryKey, ...post }) => {
  const link = `/${post.user.userName}/post/${post.id}`;
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const handle = (e: MouseEvent<HTMLDivElement>) => {
    // if(e.target)
    // push("/create", );
    const url = "/" + post.user.userName + "/status/" + post.id;
    push(url);
    console.log("need", e.target);
  };
  const commentHandle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log("commentHandle");
  };

  return (
    <div
      onClick={handle}
      className="p-1 sm:p-2 hover:bg-accent/20 flex items-start gap-3 cursor-pointer border-b border-border cursor-pointer"
    >
      {/* <UserHover following={!!post.user.followers} user={post.user}>
        <Link href={"/" + post.user.userName} className="p-1 block">
        </Link>
      </UserHover> */}
      <AvatarIcon isFollowing={!!post.user.followers} user={post.user} />
      <div className="w-full">
        <div className="flex items-center gap-x-2 flex-wrap leading-4 overflow-hidden">
          <UserHover following={!!post.user.followers} user={post.user}>
            <Link href={"/" + post.user.userName} className="font-medium hover:underline">
              {post.user.displayName}
            </Link>
          </UserHover>
          <div className="sm:text-sm text-xs flex items-center">
            <span className="text-muted-foreground ">{post.user.userName}</span>
            <TimePost createdAt={post.createdAt} />
          </div>
        </div>
        <div className="text-sm">{post.text}</div>
        <div className="flex w-full gap-4 items-center pt-1 text-muted-foreground">
          <Comment queryKey={queryKey} onClick={commentHandle} count={post.commentsCount} />
          <Like
            queryKey={queryKey}
            id={post.id}
            count={post.likesCount}
            isLiked={!!post.likes[0]}
          />
          <Bookmark
            queryKey={queryKey}
            id={post.id}
            count={post.bookmarksCount}
            isMarked={!!post.bookmarks[0]}
          />
        </div>
      </div>
    </div>
  );
};
