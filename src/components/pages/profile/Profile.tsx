"use client";
import { AvatarIcon } from "@/components/ui/avatar/Avatar";
import { HeaderBack } from "@/components/ui/header/HeaderBack";
import { useOwnProfile, useProfile } from "@/hooks/user/useProfile";
import { FC } from "react";
import styles from "./Profile.module.scss";
import { BiArrowBack } from "react-icons/bi";
import { BsCalendar3 } from "react-icons/bs";
import dayjs from "dayjs";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
// import { cn } from "@/shadcn/utils";
import cn from "classnames";
import { Tabs } from "@/components/ui/tabs/Tabs";
import { tabs } from "./profile.data";

interface Props {
  userName: string;
}

export const Profile: FC<Props> = ({ userName }) => {
  // const {} = useOwnProfile();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const search = searchParams.get("name");
  const { data, isLoading } = useProfile(userName);
  console.log("search", search);
  const createdAt = dayjs(data?.createdAt).format("MMMM YYYY").toString();
  const postsUrl = "/" + userName;
  const likesUrl = "/" + userName + "/likes";
  const followersUrl = "/" + userName + "/followers";
  const followingsUrl = "/" + userName + "/following";
  return (
    <div>
      <HeaderBack title="Profile" />
      <div className="w-full h-48 bg-secondary"></div>
      <div className="flex items-end justify-between px-6 -mt-16">
        <div className="p-1.5 bg-background rounded-full flex justify-center items-center">
          <AvatarIcon className="w-32 h-32" avatarPath={data?.avatarPath || ""} />
        </div>
        <div className="px-4 py-1.5 text-lg my-2 bg-primary hover:bg-primary/80 transition-colors rounded-full w-fit text-primary-foreground cursor-pointer">
          settings
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 text-sm">
        <div className="text-lg font-semibold">{data?.displayName}</div>
        <div className="text-muted-foreground">@{data?.userName}</div>
        <div className="flex items-center text-muted-foreground">
          <BsCalendar3 /> <span className="ml-2">registered: {createdAt}</span>
        </div>
        <div className="flex gap-4">
          <Link href={followingsUrl} className="hover:underline">
            {data?.followingCount} <span className="text-muted-foreground">followings</span>
          </Link>
          <Link href={followersUrl} className="hover:underline">
            {data?.followersCount} <span className="text-muted-foreground">followers</span>
          </Link>
        </div>
      </div>

      <Tabs userName={userName} array={tabs} />
      {/* <div className="w-full h-14 border-b border-border flex">
        <Link href={postsUrl} className="px-4 hover:bg-accent transition-colors cursor-pointer">
          <div
            className={cn("h-full px-2 flex items-center", {
              [styles.linked]: pathname === postsUrl,
            })}
          >
            Posts
          </div>
        </Link>
        <Link href={likesUrl} className="px-4 hover:bg-accent transition-colors cursor-pointer">
          <div
            className={cn("h-full px-2 flex items-center", {
              [styles.linked]: pathname === likesUrl,
            })}
          >
            Likes
          </div>
        </Link>
      </div> */}
    </div>
  );
};
