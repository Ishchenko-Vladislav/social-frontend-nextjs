"use client";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { useOwnProfile } from "@/hooks/user/useProfile";
import { PiUserLight } from "react-icons/pi";

interface Props {}

export const Publish: FC<Props> = () => {
  const { data, isLoading, error } = useOwnProfile();

  return (
    <div className="p-3 flex items-center justify-between border-b border-border">
      <div className="flex items-center gap-5">
        <Avatar className="w-8 h-8 shrink-0 border-0">
          <AvatarImage src={data?.avatarPath || ""} />
          <AvatarFallback className="dark:bg-muted-foreground bg-muted-foreground">
            <PiUserLight className="text-2xl" />
          </AvatarFallback>
        </Avatar>
        <div>What's new?</div>
      </div>
      <button className="bg-primary px-5 py-2 rounded-full hover:bg-primary/75 transition-colors">
        Publish the post
      </button>
    </div>
  );
};
