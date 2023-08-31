import { ThemesT } from "@/context/ThemeConfig";

// import { Theme } from "@/utils/themes";
interface ITheme {
  name: ThemesT;
  label: string;
  light: string;
  dark: string;
}
export const themes: ITheme[] = [
  {
    name: "slate",
    label: "Slate",
    light: "222.2 47.4% 11.2%",
    dark: "210 40% 98%",
  },
  {
    name: "red",
    label: "Red",
    light: "0 72.2% 50.6%",
    dark: "0 72.2% 50.6%",
  },
  {
    name: "rose",
    label: "Rose",
    light: "346.8 77.2% 49.8%",
    dark: "346.8 77.2% 49.8%",
  },
  {
    name: "orange",
    label: "Orange",
    light: "24.6 95% 53.1%",
    dark: "20.5 90.2% 48.2%",
  },
  {
    name: "green",
    label: "Green",
    light: "142.1 76.2% 36.3%",
    dark: "142.1 70.6% 45.3%",
  },
  {
    name: "blue",
    label: "Blue",
    light: "221.2 83.2% 53.3%",
    dark: "217.2 91.2% 59.8%",
  },
  {
    name: "yellow",
    label: "Yellow",
    light: "47.9 95.8% 53.1%",
    dark: "47.9 95.8% 53.1%",
  },
  {
    name: "violet",
    label: "Violet",
    light: "262.1 83.3% 57.8%",
    dark: "263.4 70% 50.4%",
  },
];
