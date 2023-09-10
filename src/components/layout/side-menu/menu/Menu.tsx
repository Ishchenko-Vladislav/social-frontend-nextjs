"use client";
import { Dispatch, FC, MouseEvent, SetStateAction, useEffect, useRef } from "react";
import styles from "./Menu.module.scss";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { PiUserLight } from "react-icons/pi";
import { useOwnProfile } from "@/hooks/user/useProfile";
import Link from "next/link";
import { navigation } from "../../navigation/Navigation.data";
import { MenuItem } from "./menu-item/MenuItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/ui/accordion";
import { Customize } from "../customize/Customize";
import { useTheme } from "next-themes";
import { LuPaintbrush } from "react-icons/lu";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpenCustomize: Dispatch<SetStateAction<boolean>>;
}

export const Menu: FC<Props> = ({ setIsOpen, setIsOpenCustomize }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { data, isLoading, error } = useOwnProfile();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== ref.current) setIsOpen(false);
  };
  // const style = getComputedStyle(document.body).overflow;
  useEffect(() => {
    // document.body.style.overflow = "hidden";
    return () => {
      // document.body.style.overflow = style || "auto";
      setIsOpen(false);
    };
  }, []);

  const customizeHandle = () => {
    setIsOpen(false);
    setIsOpenCustomize(true);
  };

  console.log("profile", data);
  return (
    <motion.div
      initial={theme === "dark" ? { background: "#00000000" } : { background: "#ffffff00" }}
      animate={theme === "dark" ? { background: "#ffffff94" } : { background: "#00000094" }}
      // exit={theme === "dark" ? { background: "#00000000" } : { background: "#ffffff00" }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      style={{ zIndex: 60 }}
      className="fixed inset-0 transition-opacity w-screen min-h-screen"
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        // exit={{ x: "-100%" }}
        transition={{ easings: "linier", duration: 0.2 }}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[280px] w-full bg-background min-h-screen py-5 overflow-y-auto h-full"
      >
        <header className="px-4">
          <div>
            <Link onClick={() => setIsOpen(false)} href={"/profile"}>
              <Avatar onClick={() => setIsOpen(true)} className="w-8 h-8 shrink-0 border-0">
                <AvatarImage src={data?.avatarPath || ""} />
                <AvatarFallback className="dark:bg-muted-foreground bg-muted-foreground">
                  <PiUserLight className="text-2xl" />
                </AvatarFallback>
              </Avatar>
            </Link>
            <div></div>
          </div>
          <div className="text-sm">
            <div>{data?.displayName}</div>
            <div className="text-muted-foreground leading-tight">{data?.userName}</div>
          </div>
          <div className="flex gap-5 py-3 text-sm">
            <div>{data?.following || 0} following</div>
            <div>{data?.followers || 0} followers</div>
          </div>
        </header>
        <div className="text-foreground flex flex-col py-4 border-y border-border">
          {navigation
            .filter((el) => el.mobile == false)
            .map((item) => (
              <MenuItem setIsOpen={setIsOpen} key={item.title} {...item} />
            ))}
        </div>

        <Accordion className="px-4 " type="single" collapsible>
          <AccordionItem className="border-none" value="settings">
            <AccordionTrigger className="no-underline hover:no-underline text-lg py-0 my-2">
              Settings
            </AccordionTrigger>
            <AccordionContent>
              <div onClick={customizeHandle} className="flex items-center gap-3 py-1">
                {/* <Customize /> */}
                <LuPaintbrush /> Customize
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </motion.div>
  );
};
