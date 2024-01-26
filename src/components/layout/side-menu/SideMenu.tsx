"use client";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./SideMenu.module.scss";
import { useWindowSize } from "@/hooks/useWindowSize";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
// import cn from "classnames";
import { useOwnProfile } from "@/hooks/user/useProfile";
import { PiUserLight } from "react-icons/pi";
import { Menu } from "./menu/Menu";
import { Customize } from "./customize/Customize";
import { ModalProvider } from "@/shadcn/ui/ModalProvider";
import { AvatarIcon, AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";

interface Props {}
interface Idictionary {
  [key: string]: boolean;
}
export const SideMenu: FC<Props> = () => {
  const { width } = useWindowSize();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isOpenCustomize, setIsOpenCustomize] = useState(false);
  const { data, isLoading, error } = useOwnProfile();
  const not = (path: string) => dictionary[path] || false;
  const dictionary: Idictionary = {
    "/": true,
  };
  const [isHide, setIsHide] = useState<boolean>(false);
  const lastScrollPoint = useRef(0);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setMounted(true);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = (e: any) => {
    if (window.scrollY > lastScrollPoint.current && window.scrollY > 200) {
      setIsHide(true);
    } else {
      setIsHide(false);
    }
    lastScrollPoint.current = window.scrollY;
  };
  if (width > 500 || !mounted) return null;
  // const isHide =
  return (
    <>
      <motion.div
        className={cn(
          `sticky top-0 h-14
        backdrop-blur-sm bg-background/50
        border-b-2
        border-border
        w-full z-50
        transition-all
        duration-300
        items-center hidden p-3 gap-3`,
          {
            ["-top-full"]: isHide,
            ["flex"]:
              pathname.includes("/notification") ||
              pathname.includes("/messages") ||
              pathname === "/" ||
              pathname.includes("/explore"),
          }
        )}
      >
        <AvatarIconPrototype onClick={() => setIsOpen(true)} avatarPath={data?.avatarPath} />
        {pathname === "/messages" ? (
          <div>
            <span>Messages</span>
          </div>
        ) : pathname === "/" ? (
          <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}>
            Social
          </div>
        ) : pathname === "/explore" ? (
          <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}>
            <span>Explore</span>
          </div>
        ) : pathname === "/bookmarks" ? (
          <div>Bookmarks</div>
        ) : pathname === "/notification" ? (
          <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}>
            <span>Notification</span>
          </div>
        ) : null}

        {/* <div className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}>Social</div> */}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          // <ModalProvider>
          <Menu setIsOpen={setIsOpen} setIsOpenCustomize={setIsOpenCustomize} />
          // </ModalProvider>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpenCustomize && (
          <ModalProvider>
            <Customize setIsOpen={setIsOpenCustomize} />
          </ModalProvider>
        )}
      </AnimatePresence>
    </>
  );
};
