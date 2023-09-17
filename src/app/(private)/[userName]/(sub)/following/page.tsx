"use client";
import { UserSub } from "@/components/ui/user/UserSub";
import { useFollowings } from "@/hooks/user/useProfile";
import React, { FC } from "react";
import Cookie from "js-cookie";
interface Props {
  params: { userName: string };
}

const Following: FC<Props> = ({ params }) => {
  const { data, isLoading } = useFollowings(params.userName);
  if (isLoading) return null;
  console.log("followings", data);
  const myUserName = Cookie.get("user_name");
  return (
    <div>
      {data &&
        !!data.length &&
        data.map((u: any) => <UserSub isMe={u.fromUser.userName === myUserName} {...u.toUser} />)}
    </div>
  );
};

export default Following;
