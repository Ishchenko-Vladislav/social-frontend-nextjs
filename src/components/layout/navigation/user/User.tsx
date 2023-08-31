"use client";
import { FC, useState } from "react";
import styles from "./User.module.scss";
import { PiUserLight } from "react-icons/pi";
import { useProfile } from "@/hooks/user/useProfile";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/shadcn/ui/popover";
import { useTheme } from "next-themes";
import { LuPaintbrush } from "react-icons/lu";
import { Customize } from "./customize/Customize";

interface Props {}

export const User: FC<Props> = () => {
  const { data, isLoading, error } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={styles.user}>
          <div className={styles.avatar}>
            <PiUserLight className="text-2xl" />
          </div>
          <div className={styles.names}>
            <div className={styles.displayName}>
              {data?.displayName ? data.displayName : "unknown"}
            </div>
            <p className={styles.userName}>{data?.userName}</p>
          </div>
          <div className={styles.info}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className={styles.popup}>
        <PopoverClose onClick={() => setIsOpen(true)} className={styles.customizeButton}>
          <LuPaintbrush /> Customize
        </PopoverClose>
        {/* <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-2 py-2 hover:bg-accent cursor-pointer dark:text-red-500"
        >
          dark mode
        </div> */}
        <button className={styles.signout}>
          <div>Sign out</div>
          <div className="text-muted-foreground text-sm leading-4 break-all">{data?.userName}</div>
        </button>
      </PopoverContent>

      {isOpen && <Customize setIsOpen={setIsOpen} />}
    </Popover>
  );
};
