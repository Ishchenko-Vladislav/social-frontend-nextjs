"use client";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { useOwnProfile } from "@/hooks/user/useProfile";
import { PiUserLight } from "react-icons/pi";
import { AvatarIcon, AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { useWindowSize } from "@/hooks/useWindowSize";
import { CreatePost } from "./create-post/CreatePost";
import { CreatePostMobile } from "./create-post-mobile/CreatePostMobile";

interface Props {}

export const Publish: FC<Props> = () => {
  const { data, isLoading, error } = useOwnProfile();
  const { width } = useWindowSize();
  if (width && width < 500) return <CreatePostMobile />;
  return (
    <CreatePost />
    // <div></div>
    // <div className="p-3 flex items-center justify-between border-b border-border">
    //   <div className="flex items-center gap-5">
    //     {/* <Avatar className="w-8 h-8 shrink-0 border-0">
    //       <AvatarImage src={data?.avatarPath || ""} />
    //       <AvatarFallback className="dark:bg-muted-foreground bg-muted-foreground">
    //         <PiUserLight className="text-2xl" />
    //       </AvatarFallback>
    //     </Avatar> */}
    //     <AvatarIconPrototype avatarPath={data?.avatarPath} />
    //     <div>What is happening?</div>
    //   </div>
    //   <button className="bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/75 transition-colors">
    //     Post
    //   </button>
    // </div>
  );
};
