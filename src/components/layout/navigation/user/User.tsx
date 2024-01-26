"use client";
import { FC, useState } from "react";
import styles from "./User.module.scss";
import { PiUserLight } from "react-icons/pi";
import { useOwnProfile } from "@/hooks/user/useProfile";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/shadcn/ui/popover";
import { LuPaintbrush } from "react-icons/lu";
import { Customize } from "./customize/Customize";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { useFixed } from "@/context/FixedContext";
import { AvatarIcon, AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useAuth } from "@/context/auth/Authorization";

interface Props {}

export const User: FC<Props> = () => {
  const { data, isLoading, error } = useOwnProfile();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const { setOpenCustomize } = useFixed();
  const { width } = useWindowSize();
  if (width < 500) return null;
  // const logout = ()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={styles.user}>
          {/* <Avatar className="w-8 h-8 shrink-0 border-0">
            <AvatarImage src={data?.avatarPath || ""} />
            <AvatarFallback className="dark:bg-muted-foreground bg-muted-foreground">
              <PiUserLight className="text-2xl" />
            </AvatarFallback>
          </Avatar> */}
          <AvatarIconPrototype avatarPath={data?.avatarPath} />

          <div className={styles.names}>
            <div className={styles.displayName}>
              {data?.displayName ? data.displayName : "unknown"}
            </div>
            <p className={styles.userName}>@{data?.userName}</p>
          </div>
          <div className={styles.info}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-popover left-[200px]">
        <div className={styles.popup}>
          <PopoverClose onClick={() => setIsOpen(true)} className={styles.customizeButton}>
            <LuPaintbrush /> Customize
          </PopoverClose>
          <PopoverClose asChild>
            <button onClick={logout} className={styles.signout}>
              <div>Sign out</div>
              <div className="text-muted-foreground text-sm leading-4 break-all">
                @{data?.userName}
              </div>
            </button>
          </PopoverClose>
        </div>
      </PopoverContent>

      {isOpen && <Customize setIsOpen={setIsOpen} />}
    </Popover>
  );
};
