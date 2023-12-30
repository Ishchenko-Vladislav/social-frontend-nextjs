"use client";
import {
  Dispatch,
  DragEvent,
  FC,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
// import styles from "./Customize.module.scss";
import cn from "classnames";
import { themes } from "./customize.data";
// import { useConfig } from "@/hooks/useConfig";
import { BsCheck } from "react-icons/bs";
import { useTheme } from "next-themes";
import { VscMove } from "react-icons/vsc";
import { HiCheck } from "react-icons/hi";
import { MdOutlineClose, MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useConfig } from "@/context/ThemeConfig";
import { motion, useDragControls } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";
interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Customize: FC<Props> = ({ setIsOpen }) => {
  const controls = useDragControls();
  const [mounted, setMounted] = useState(false);
  // const { width } = useWindowSize();
  function startDrag(event: any) {
    controls.start(event);
  }
  const { config, setConfig } = useConfig();
  const { setTheme, theme } = useTheme();

  const ref = useRef<HTMLDivElement>(null);
  const refParent = useRef<HTMLDivElement>(null);

  // if (width < 500) return null;

  return (
    <>
      <div className="fixed inset-0 pointer-events-none select-none" ref={refParent}></div>
      <motion.div
        drag
        style={{ touchAction: "none" }}
        dragConstraints={refParent}
        ref={ref}
        dragElastic={0}
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        className="bg-popover border border-border fixed rounded-sm max-w-xs w-full"
        // className={styles.customize}
      >
        <div className="flex items-center gap-3 mb-5 py-3 px-2">
          <div onPointerDown={startDrag} className="flex items-center gap-3 w-full cursor-move">
            <VscMove size="1.5rem" />
            <div>Customize</div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="ml-auto p-1.5 rounded-full transition-colors border border-transparent hover:border-primary"
          >
            <MdOutlineClose className="text-foreground text-xl" />
          </button>
        </div>
        <div className="px-2">
          <span className="text-sm">Color</span>
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
                      ["border-[--theme-primary]"]: isActive,
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
        <div className="px-2 py-4">
          <span className="text-sm">Mode</span>
          <div className="flex gap-4 mt-3">
            <button
              onClick={() => setTheme("light")}
              className={cn(
                "border-2 rounded-[6px] border-border flex items-center justify-evenly gap-2 px-2 py-1",
                {
                  ["border-[--theme-primary]"]: theme === "light",
                }
              )}
            >
              <MdOutlineLightMode />
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={cn(
                "border-2 rounded-[6px] border-border flex items-center justify-evenly gap-2 px-2 py-1",
                {
                  ["border-[--theme-primary]"]: theme === "dark",
                }
              )}
            >
              <MdOutlineDarkMode />
              Dark
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};
