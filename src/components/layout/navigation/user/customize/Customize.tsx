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
import styles from "./Customize.module.scss";
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
interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Customize: FC<Props> = ({ setIsOpen }) => {
  const controls = useDragControls();
  function startDrag(event: any) {
    controls.start(event);
  }
  const { config, setConfig } = useConfig();
  const { setTheme, theme } = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const refScreen = useRef({ left: 0, right: 0, top: 0, bottom: 0 });

  useEffect(() => {
    refScreen.current.left = (ref.current && 5 - ref.current.offsetLeft) || 0;
    refScreen.current.top = (ref.current && 5 - ref.current.offsetTop) || 0;
    refScreen.current.right =
      (ref.current && window.innerWidth - ref.current.offsetWidth - ref.current.offsetLeft - 24) ||
      0;
    refScreen.current.bottom =
      (ref.current && window.innerHeight - ref.current.offsetHeight - ref.current.offsetTop - 5) ||
      0;
  }, []);

  return (
    <motion.div
      drag
      style={{ touchAction: "none" }}
      dragConstraints={refScreen.current}
      ref={ref}
      dragElastic={0}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      className={styles.customize}
    >
      <div className={styles.header}>
        <div onPointerDown={startDrag} className={styles.name}>
          <VscMove size="1.5rem" />
          <div>Customize</div>
        </div>
        <button onClick={() => setIsOpen(false)} className={styles.close}>
          <MdOutlineClose className="text-foreground text-xl" />
        </button>
      </div>
      <div className={styles.color}>
        <span>Color</span>
        <div className={styles.colors}>
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
      <div className={styles.modeBlock}>
        <span>Mode</span>
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
    </motion.div>
  );
};
