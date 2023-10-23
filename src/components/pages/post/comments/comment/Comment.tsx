import { AvatarIcon, UserHover } from "@/components/ui/avatar/Avatar";
import { TimePost } from "@/components/ui/post/time-post/TimePost";
import { IComment } from "@/services/comment/comment.interface";
import Link from "next/link";
// import { AvatarIcon } from '@radix-ui/react-icons';
import { FC } from "react";
import { Like } from "./like/Like";
import Image from "next/image";
import { cn } from "@/utils/utils";

interface Props {}

export const Comment: FC<IComment> = ({
  id,
  user,
  createdAt,
  text,
  likesCount,
  likes = [],
  attachment,
}) => {
  return (
    <div
      //   onClick={handle}
      className="py-1 sm:py-2 px-3 sm:px-4 hover:bg-accent/20 flex items-start gap-3  border-b border-border "
    >
      {/* <UserHover following={!!post.user.followers} user={post.user}>
        <Link href={"/" + post.user.userName} className="p-1 block">
        </Link>
      </UserHover> */}
      <AvatarIcon isFollowing={!!user.followers} user={user} />
      <div className="w-full flex flex-col gap-1">
        <div className="flex items-center gap-x-2 flex-wrap leading-4 overflow-hidden">
          <UserHover following={!!user.followers} user={user}>
            <Link href={"/" + user.userName} className="font-medium hover:underline">
              {user.displayName}
            </Link>
          </UserHover>
          <div className="sm:text-sm text-xs flex items-center">
            <span className="text-muted-foreground ">{user.userName}</span>
            <TimePost createdAt={createdAt} />
          </div>
        </div>
        <div className="text-sm whitespace-pre-wrap">{text ? text : null}</div>
        {attachment && !!attachment.length
          ? attachment.map((attach) => {
              return (
                <div key={attach.id} className="w-full  overflow-hidden">
                  {attach.resourceType === "image" ? (
                    <div className={cn(" w-full relative overflow-hidden")}>
                      <Image
                        className={cn(
                          "max-w-full max-h-[500px] w-fit h-auto rounded-2xl object-contain"
                        )}
                        width={attach.image?.width ?? 2000}
                        height={attach.image?.height ?? 2000}
                        src={attach.secureUrl ?? attach.url ?? ""}
                        alt="image"
                      />
                    </div>
                  ) : attach.resourceType === "video" ? (
                    <video
                      controls
                      muted
                      autoPlay
                      loop
                      className="object-contain w-full aspect-square bg-black rounded-2xl h-full"
                    >
                      <source className="object-contain" src={attach.url} />
                      <source className="object-contain" src={attach.secureUrl} />
                    </video>
                  ) : null}
                </div>
              );
            })
          : null}

        <div className="flex w-full gap-4 items-center pt-1 text-muted-foreground">
          <Like
            queryKey={""}
            id={id}
            count={likesCount}
            isLiked={!!likes[0] || false}
            // isLiked={false}
          />
          {/* <Comment queryKey={queryKey} onClick={commentHandle} count={post.commentsCount} />
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
          /> */}
        </div>
      </div>
    </div>
  );
};
