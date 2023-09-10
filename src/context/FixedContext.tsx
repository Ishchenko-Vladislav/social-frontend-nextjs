"use client";
import { Customize } from "@/components/layout/navigation/user/customize/Customize";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

interface IFixedContext {
  isOpenCustomize: boolean;
  setOpenCustomize: Dispatch<SetStateAction<boolean>>;
}
const FixedContext = createContext({} as IFixedContext);

export const useFixed = () => useContext(FixedContext);

export const FixedProvider = ({ children }: { children?: ReactNode }) => {
  const [isOpenCustomize, setOpenCustomize] = useState(false);
  return (
    <FixedContext.Provider value={{ isOpenCustomize, setOpenCustomize }}>
      {isOpenCustomize && <Customize setIsOpen={setOpenCustomize} />}
    </FixedContext.Provider>
  );
};
