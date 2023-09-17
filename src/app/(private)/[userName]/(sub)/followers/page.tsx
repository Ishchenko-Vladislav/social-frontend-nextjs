"use client";
import { UserSub } from "@/components/ui/user/UserSub";
import { useFollowers } from "@/hooks/user/useProfile";
import React, { FC } from "react";

interface Props {
  params: { userName: string };
}

const Followers: FC<Props> = ({ params }) => {
  const { data, isLoading } = useFollowers(params.userName);
  if (isLoading) return null;
  console.log("followers", data);
  return <div>{data && !!data.length && data.map((u) => <UserSub {...u.fromUser} />)}</div>;
};

export default Followers;
