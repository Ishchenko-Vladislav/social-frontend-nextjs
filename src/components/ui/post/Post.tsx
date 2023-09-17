"use client";
import { IPost } from "@/services/post/post.interface";
import { FC, MouseEvent, HTMLAttributes, PropsWithChildren } from "react";
import { AvatarIcon } from "../avatar/Avatar";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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
interface Props extends IPost {
  queryKey: string;
}

export const Post: FC<Props> = ({ queryKey, ...post }) => {
  const link = `/${post.user.userName}/post/${post.id}`;
  dayjs.extend(relativeTime);
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const handle = (e: MouseEvent<HTMLDivElement>) => {
    // if(e.target)
    // push("/create", );
    console.log(e.target);
  };
  const commentHandle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log("commentHandle");
  };

  return (
    <div
      onClick={handle}
      className="p-2 hover:bg-accent/20 flex items-start gap-3 cursor-pointer border-b border-border"
    >
      <UserHover following={!!post.user.followers} user={post.user}>
        <Link href={"/"} className="p-1 block">
          <AvatarIcon avatarPath={post.user.avatarPath} />
        </Link>
      </UserHover>
      <div className="w-full">
        <div className="flex gap-2 items-center">
          <UserHover following={!!post.user.followers} user={post.user}>
            <span className="font-medium hover:underline">{post.user.displayName}</span>
          </UserHover>
          <span className="text-muted-foreground text-sm">{post.user.userName}</span>
          <span className="text-muted-foreground text-sm">· {dayjs(post.createdAt).fromNow()}</span>
        </div>
        <div className="text-sm">{post.text}</div>
        <div className="flex w-full gap-4 items-center pt-1 text-muted-foreground no-link">
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

interface IUserHoverProps {
  user: IUser;
  following: boolean;
}
const UserHover: FC<PropsWithChildren<IUserHoverProps>> = ({ children, user, following }) => {
  // const { data, isLoading } = useStatus(user.id);
  // if (isLoading) return null;
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <div className="flex justify-between items-start">
          <div>
            <AvatarIcon className="w-11 h-11" avatarPath={user.avatarPath} />
          </div>
          <button className="px-3 py-1 bg-foreground rounded-full text-background hover:bg-foreground/80 transition-colors">
            {following ? <div>unfollow</div> : <div>follow</div>}
          </button>
        </div>
        <div>
          <div className="pt-2">{user.displayName}</div>
          <div className="text-muted-foreground leading-3">@{user.userName}</div>
        </div>
        <div className="flex gap-3 items-center text-sm pt-3">
          <div>{user.followingCount} following</div>
          <div>{user.followersCount} followers</div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
