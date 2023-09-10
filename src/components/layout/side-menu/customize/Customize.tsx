"use client";
import {
  FC,
  useState,
  ButtonHTMLAttributes,
  Dispatch,
  SetStateAction,
  useRef,
  MouseEventHandler,
  MouseEvent,
} from "react";
import styles from "./Customize.module.scss";
import { BiArrowBack } from "react-icons/bi";
import { motion } from "framer-motion";
import { useConfig } from "@/context/ThemeConfig";
import { useTheme } from "next-themes";
import cn from "classnames";
import { HiCheck } from "react-icons/hi";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { themes } from "../../navigation/user/customize/customize.data";
interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Customize: FC<Props> = ({ setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { config, setConfig } = useConfig();
  const { theme, setTheme } = useTheme();
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (ref.current !== e.target) setIsOpen(false);
  };
  return (
    <motion.div className="fixed inset-0 bg-background z-50 w-screen h-screen">
      <header className="flex items-center gap-5 p-3 ">
        <div className="text-lg" onClick={() => setIsOpen(false)}>
          <BiArrowBack />
        </div>
        <div className="text-xl">Customize</div>
      </header>
      <div className="p-3">
        <div className="pb-2">Color</div>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((el) => {
            const isActive = config.theme === el.name;
            return (
              <button
                key={el.name}
                style={
                  {
                    "--theme-primary": `hsl(${theme === "light" ? el.light : el.dark})`,
                    // "--theme-primary": `hsl(${el.light})`,
                  } as React.CSSProperties
                }
                onClick={() => setConfig({ theme: el.name })}
                className={cn(
                  `h-8 rounded-[4px] border border-border flex items-center w-full gap-2 px-1.5 hover:bg-accent`,
                  {
                    [styles.active]: isActive,
                  }
                )}
              >
                <div
                  className={cn(
                    `w-4 h-4 rounded-full flex justify-center items-center bg-[--theme-primary]`
                  )}
                >
                  {isActive && <HiCheck className="text-sm text-primary-foreground" />}
                </div>
                <div>{el.label}</div>
              </button>
            );
          })}
        </div>
      </div>
      <div className="p-3">
        <div className="py-2">Mode</div>
        <div className={styles.modeBlock}>
          <div className={styles.modes}>
            <button
              onClick={() => setTheme("light")}
              className={cn(styles.mode, {
                [styles.active]: theme === "light",
              })}
            >
              <MdOutlineLightMode />
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={cn(styles.mode, {
                [styles.active]: theme === "dark",
              })}
            >
              <MdOutlineDarkMode />
              Dark
            </button>
          </div>
        </div>
      </div>
      {/* <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ easings: "linier" }}
        ref={ref}
        className="w-screen h-[60%] bg-red-500 bottom-0 absolute rounded-t-3xl overflow-hidden"
      >
        asdasddddddddddddddddddddddddddddddddddddddddddddddddddsss
      </motion.div> */}
    </motion.div>
  );
};
