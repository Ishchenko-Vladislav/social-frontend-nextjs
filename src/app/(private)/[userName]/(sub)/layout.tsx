import { HeaderBack } from "@/components/ui/header/HeaderBack";
import Link from "next/link";
import React, { FC, ReactNode } from "react";
import styles from "./Layout.module.scss";
import { usePathname } from "next/navigation";
import { Tabs } from "@/components/ui/tabs/Tabs";
import { tabs } from "./tabs.data";
interface Props {
  children: ReactNode;
  params: { userName: string };
}

const layout: FC<Props> = ({ children, params }) => {
  const followersUrl = "/" + params.userName + "/followers";
  const followingsUrl = "/" + params.userName + "/following";
  return (
    <>
      <div>
        <HeaderBack title={"@" + params.userName} />
      </div>
      <Tabs userName={params.userName} array={tabs} />
      {/* <div className="w-full h-14 border-b border-border flex">
        <Link
          className="px-4 hover:bg-accent transition-colors cursor-pointer"
          href={followingsUrl}
        >
          <div
            className={cn("h-full px-2 flex items-center", {
              [styles.linked]: pathname === followingsUrl,
            })}
          >
            followings
          </div>
        </Link>
        <Link className="px-4 hover:bg-accent transition-colors cursor-pointer" href={followersUrl}>
          followers
        </Link> */}
      {/* </div> */}
      {children}
    </>
  );
};

export default layout;
