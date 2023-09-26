"use client";
import { FC, PropsWithChildren } from "react";
import { ProgressBar } from "./ProgressBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToasterContainer } from "./Toaster";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeConfigProvider } from "@/context/ThemeConfig";
import { ThemeSwitcher } from "./ThemeSwitcher";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  dayjs.extend(relativeTime);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ThemeConfigProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        <ThemeSwitcher />
      </ThemeConfigProvider>
      <ProgressBar />
      <ToasterContainer />
    </ThemeProvider>
  );
};
