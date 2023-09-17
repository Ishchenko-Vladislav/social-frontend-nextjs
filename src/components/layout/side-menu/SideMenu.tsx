"use client";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./SideMenu.module.scss";
import { useWindowSize } from "@/hooks/useWindowSize";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import cn from "classnames";
import { useOwnProfile } from "@/hooks/user/useProfile";
import { PiUserLight } from "react-icons/pi";
import { Menu } from "./menu/Menu";
import { Customize } from "./customize/Customize";
import { ModalProvider } from "@/shadcn/ui/ModalProvider";
import { AvatarIcon } from "@/components/ui/avatar/Avatar";

interface Props {}

export const SideMenu: FC<Props> = () => {
  const { width } = useWindowSize();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCustomize, setIsOpenCustomize] = useState(false);
  const { data, isLoading, error } = useOwnProfile();

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
  if (!mounted) return null;
  if (width > 500) return null;
  return (
    <>
      <motion.div
        className={cn(styles.navigation, {
          [styles.scrollable]: isHide,
        })}
      >
        <AvatarIcon onClick={() => setIsOpen(true)} avatarPath={data?.avatarPath} />
        {/* <Avatar onClick={() => setIsOpen(true)} className="w-8 h-8 shrink-0 border-0">
          <AvatarImage src={data?.avatarPath || ""} />
          <AvatarFallback className="dark:bg-muted-foreground bg-muted-foreground">
            <PiUserLight className="text-2xl" />
          </AvatarFallback>
        </Avatar> */}
        <div className={styles.logo}>Social</div>
        {/* <AnimatePresence>
          {isOpen && (
            <ModalProvider>
              <Menu setIsOpen={setIsOpen} setIsOpenCustomize={setIsOpenCustomize} />
            </ModalProvider>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isOpenCustomize && !isOpen && (
            <ModalProvider>
              <Customize />
            </ModalProvider>
          )}
        </AnimatePresence> */}
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
