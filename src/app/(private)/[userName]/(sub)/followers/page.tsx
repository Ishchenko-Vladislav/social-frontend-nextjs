"use client";
import { UserSub } from "@/components/ui/user/UserSub";
import { useAuth } from "@/context/auth/Authorization";
import { useFollowers } from "@/hooks/user/useProfile";
import React, { FC } from "react";

interface Props {
  params: { userName: string };
}

const Followers: FC<Props> = ({ params }) => {
  const { data, isLoading } = useFollowers(params.userName);
  const { user } = useAuth();

  if (isLoading) return null;
  console.log("followers", data);
  return (
    <div>
      {data &&
        !!data.followers &&
        data.followers.map((u) => (
          <UserSub
            isMe={u.fromUser.id === user.id}
            imFollower={u.fromUser.followers[0] || false}
            key={u.id}
            {...u.fromUser}
          />
        ))}
    </div>
  );
};

export default Followers;
