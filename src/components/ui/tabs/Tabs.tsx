"use client";
import Link from "next/link";
import { FC } from "react";
import styles from "./Tabs.module.scss";
import cn from "classnames";
import { usePathname } from "next/navigation";
interface Props {
  array: ITabs[];
  userName: string;
}
export interface ITabs {
  url: string;
  title: string;
}

export const Tabs: FC<Props> = ({ array, userName }) => {
  const pathname = usePathname();
  return (
    <div className="w-full h-14 border-b border-border flex">
      {array &&
        !!array.length &&
        array.map((tab) => (
          <Link
            replace
            key={tab.title}
            href={"/" + userName + tab.url}
            className="px-4 hover:bg-accent transition-colors cursor-pointer"
          >
            <div
              className={cn("h-full px-2 flex items-center", {
                [styles.linked]: pathname === "/" + userName + tab.url,
              })}
            >
              {tab.title}
            </div>
          </Link>
        ))}
    </div>
  );
};
