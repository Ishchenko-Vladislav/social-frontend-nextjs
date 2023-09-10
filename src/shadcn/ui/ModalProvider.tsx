"use client";
import { FC, useEffect, PropsWithChildren } from "react";

interface Props {}

export const ModalProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const style = getComputedStyle(document.body).overflow;
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = style || "auto";
      // setIsOpen(false);
    };
  }, []);
  return <>{children}</>;
};
