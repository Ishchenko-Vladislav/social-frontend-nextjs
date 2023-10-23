"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
interface IThemeConfig {
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
}
type Config = {
  theme: ThemesT;
};
export type ThemesT = "slate" | "red" | "rose" | "orange" | "green" | "blue" | "yellow" | "violet";

const ThemeConfig = createContext({} as IThemeConfig);

export const useConfig = () => {
  const context = useContext(ThemeConfig);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};

export const ThemeConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config>(() => {
    // console.log("window", window);
    if (typeof localStorage == "undefined") return { theme: "slate" };
    const config = JSON.parse((localStorage && localStorage.getItem("config")) || "{}");
    if (config) {
      return config;
    } else {
      return { theme: "slate" };
    }
  });

  useEffect(() => {
    localStorage.setItem("config", JSON.stringify(config));
  }, [config]);
  return (
    <ThemeConfig.Provider value={{ config, setConfig }}>
      <div>{children}</div>
    </ThemeConfig.Provider>
  );
};
