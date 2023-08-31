import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import cn from "classnames";
interface IThemeConfig {
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
}
type Config = {
  theme: ThemesT;
};
export type ThemesT = "slate" | "red" | "rose" | "orange" | "green" | "blue" | "yellow" | "violet";

const ThemeConfig = createContext({} as IThemeConfig);

export const useConfig = () => useContext(ThemeConfig);

export const ThemeConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<Config>({ theme: "slate" });
  const defaultConfig = JSON.parse(localStorage.getItem("config") || "{}")?.theme || "slate";
  useEffect(() => {
    const config = JSON.parse(localStorage.getItem("config") || "{}");
    if (config && config.theme) setConfig(config);
  }, []);

  useEffect(() => {
    localStorage.setItem("config", JSON.stringify(config));
  }, [config]);
  return (
    <ThemeConfig.Provider value={{ config, setConfig }}>
      <div className={cn(`theme-${config.theme || defaultConfig}`)}>{children}</div>
    </ThemeConfig.Provider>
  );
};
