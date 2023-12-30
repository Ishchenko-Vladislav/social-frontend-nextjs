"use client";
import { FC, useEffect } from "react";
import { Search } from "./search/Search";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
interface Props {}

export const SideBar: FC<Props> = () => {
  const pathname = usePathname();
  console.log("HERE MESSAGES", pathname);
  return (
    <div
      className={cn("", {
        ["hidden"]: pathname.includes("/messages"),
      })}
    >
      <div className={cn("w-80 sticky top-0 xl:w-96 hidden lg:block p-3 px-5 z-0")}>
        <Search />
      </div>
    </div>
  );
};
