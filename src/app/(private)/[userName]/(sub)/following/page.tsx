"use client";
import { UserSub } from "@/components/ui/user/UserSub";
import { useFollowings } from "@/hooks/user/useProfile";
import React, { FC } from "react";
import Cookie from "js-cookie";
import { useAuth } from "@/context/auth/Authorization";
interface Props {
  params: { userName: string };
}

const Following: FC<Props> = ({ params }) => {
  const { data, isLoading } = useFollowings(params.userName);
  const { user } = useAuth();
  if (isLoading) return null;
  console.log("followings", data);
  // const myUserName = Cookie.get("user_name");
  return (
    <div>
      {data &&
        !!data.following &&
        data.following.map((u) => (
          <UserSub
            key={u.id}
            isMe={u.toUser.id === user.id}
            imFollower={u.toUser.followers[0] || false}
            {...u.toUser}
          />
        ))}
    </div>
  );
};

export default Following;
