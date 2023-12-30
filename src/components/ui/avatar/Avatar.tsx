import { FC, ButtonHTMLAttributes, PropsWithChildren, MouseEvent, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { PiUserLight } from "react-icons/pi";
import cn from "classnames";
import Image from "next/image";
import { IUser } from "@/services/user/user.interface";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/shadcn/ui/hover-card";
import Link from "next/link";
import { useAuth } from "@/context/auth/Authorization";
import { useFollow, useProfile } from "@/hooks/user/useProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserService } from "@/services/user/user.service";
import { Button } from "@/shadcn/ui/button";
import { QUERY_KEY } from "@/utils/constants";

// const AvatarPrimitive = () => {}

// AvatarPrimitive.Avatar = Avatar
// type TUserHoverProps = {
//   user: IUser
// }
// const UserHover = ({user}: TUserHoverProps) => {
//   return (
//         <HoverCard>
//       <HoverCardTrigger asChild>{children}</HoverCardTrigger>
//       <HoverCardContent>
//         <div className="flex justify-between items-start">
//           <Link href={"/" + user.userName}>
//             <AvatarIconPrototype className="w-11 h-11" avatarPath={user?.avatarPath} />
//           </Link>

//           {user.id !== currentUser.id ? (
//             <button
//               onClick={followHandle}
//               className="px-3 py-1 leading-6 bg-foreground rounded-full text-background hover:bg-foreground/80 transition-colors"
//             >
//               {following ? <div>unfollow</div> : <div>follow</div>}
//             </button>
//           ) : null}
//         </div>
//         <div>
//           <div className="pt-2">{user.displayName}</div>
//           <div className="text-muted-foreground leading-3">@{user.userName}</div>
//         </div>
//         <div className="flex gap-3 items-center text-sm pt-3">
//           <Link href={"/" + user.userName + "/following"} className="hover:underline">
//             {user.followingCount} following
//           </Link>
//           <Link href={"/" + user.userName + "/followers"} className="hover:underline">
//             {user.followersCount} followers
//           </Link>
//         </div>
//       </HoverCardContent>
//     </HoverCard>
//   )
// }

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
export const UserHover: FC<PropsWithChildren<IUserHoverProps>> = ({ children, user }) => {
  if (!user) return null;
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent>
        <Content userName={user.userName} />
      </HoverCardContent>
    </HoverCard>
  );
};
type TContentProps = {
  userName: string;
};
const Content: FC<TContentProps> = ({ userName }) => {
  const { data: user } = useProfile(userName);
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (userId: string) => UserService.follow(userId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEY.profile, { userName }]});
    },
    onError(error: any, variables, context) {
      console.log(error);
      if (error instanceof AxiosError) {
        const message = error.response?.data.message;
        if (message) {
          return error.response?.data.message;
        } else {
          error.message;
        }
      }
      return error;
    },
  });
  const followHandle = () => {
    mutate(user?.id ?? "");
  };

  if (!user) return null;
  const isFollowing = user.followers && user.followers.length > 0;
  return (
    <div>
      <div className="flex justify-between items-start">
        <Link href={"/" + user.userName}>
          <AvatarIconPrototype className="w-11 h-11" avatarPath={user?.avatarPath} />
        </Link>

        {user.id !== currentUser.id ? (
          <Button onClick={followHandle}>
            {isFollowing ? <div>unfollow</div> : <div>follow</div>}
          </Button>
        ) : null}
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
    </div>
  );
};
