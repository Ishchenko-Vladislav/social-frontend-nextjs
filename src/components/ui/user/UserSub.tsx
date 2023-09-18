import { FC } from "react";
import { AvatarIcon } from "../avatar/Avatar";
import { IUser } from "@/services/user/user.interface";

interface Props extends IUser {
  imFollower?: boolean;
  isMe?: boolean;
}

export const UserSub: FC<Props> = ({ imFollower = false, isMe = false, ...user }) => {
  return (
    <div className="flex gap-3 p-3 border-b border-border">
      <div>
        <AvatarIcon user={user} isFollowing={imFollower} />
      </div>
      <div className="flex w-full flex-col ">
        <div className="flex w-full ">
          <div className="text-sm">
            <div>{user.displayName}</div>
            <div className="text-muted-foreground leading-3">@{user.userName}</div>
          </div>

          {isMe ? (
            <button className="ml-auto px-4 py-1.5 w-fit h-fit bg-foreground text-background hover:bg-foreground/80 transition-colors rounded-full">
              it's me
            </button>
          ) : imFollower ? (
            <button className="ml-auto px-4 py-1.5 w-fit h-fit bg-foreground text-background hover:bg-foreground/80 transition-colors rounded-full">
              unfollow
            </button>
          ) : (
            <button className="ml-auto px-4 py-1.5 w-fit h-fit bg-foreground text-background hover:bg-foreground/80 transition-colors rounded-full">
              follow
            </button>
          )}
          {/* <button className="ml-auto px-4 py-1.5 w-fit h-fit bg-foreground text-background hover:bg-foreground/80 transition-colors rounded-full">
            {isMe ? "unfollow" : "follow"}
          </button> */}
        </div>
        <div>asdasdasd as das das da dsas a as das asd as das dad sda s</div>
      </div>
    </div>
  );
};
