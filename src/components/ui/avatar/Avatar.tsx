import { FC, ButtonHTMLAttributes, PropsWithChildren, MouseEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { PiUserLight } from "react-icons/pi";
import cn from "classnames";
import Image from "next/image";
import { IUser } from "@/services/user/user.interface";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shadcn/ui/hover-card";
import Link from "next/link";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  avatarPath: string | null | undefined;
}

interface IAvatarIcon {
  isFollowing: boolean;
  user: IUser;
}
export const AvatarIcon: FC<IAvatarIcon> = ({ isFollowing, user }) => {
  if (!user) return null;
  const handle = (e: any) => {
    e.stopPropagation();
  };
  return (
    <div onClick={handle}>
      <UserHover following={isFollowing} user={user}>
        <Link href={"/" + user.userName}>
          <AvatarIconPrototype avatarPath={user?.avatarPath} />
        </Link>
      </UserHover>
    </div>
  );
};

export const AvatarIconPrototype: FC<Props> = ({ avatarPath, className, ...atr }) => {
  return (
    <Avatar {...atr} className={cn("w-8 h-8 shrink-0 border-0", className)}>
      <AvatarImage src={avatarPath || ""} />
      <AvatarFallback className="relative">
        <Image src={"/default_profile.png"} alt="default_profile" fill />
      </AvatarFallback>
    </Avatar>
  );
};

interface IUserHoverProps {
  user: IUser;
  following: boolean;
}
export const UserHover: FC<PropsWithChildren<IUserHoverProps>> = ({
  children,
  user,
  following,
}) => {
  if (!user) return null;
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent>
        <div className="flex justify-between items-start">
          <Link href={"/" + user.userName}>
            <AvatarIconPrototype className="w-11 h-11" avatarPath={user?.avatarPath} />
          </Link>
          <button className="px-3 py-1 bg-foreground rounded-full text-background hover:bg-foreground/80 transition-colors">
            {following ? <div>unfollow</div> : <div>follow</div>}
          </button>
        </div>
        <div>
          <div className="pt-2">{user.displayName}</div>
          <div className="text-muted-foreground leading-3">@{user.userName}</div>
        </div>
        <div className="flex gap-3 items-center text-sm pt-3">
          <Link href={"/" + user.userName + "/following"} className="hover:underline">
            {user.followingCount} following
          </Link>
          <Link href={"/" + user.userName + "/followers"} className="hover:underline">
            {user.followersCount} followers
          </Link>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
