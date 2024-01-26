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
import { SocketProvider } from "@/context/SocketContext";
// import updateLocale from "dayjs/plugin/updateLocale";

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  dayjs.extend(relativeTime);
  // dayjs.extend(updateLocale);
  // dayjs.updateLocale('en', {
  //   relativeTime: {
  //     future: "in %s",
  //     past: "%s ago",
  //     s: 'a few seconds',
  //     m: "a minute",
  //     mm: "%d minutes",
  //     h: "an hour",
  //     hh: "%d hours",
  //     d: "a day",
  //     dd: "%d days",
  //     M: "a month",
  //     MM: "%d months",
  //     y: "a year",
  //     yy: "%d years"
  //   }
  // })

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
        <QueryClientProvider client={queryClient}>
          <>{children}</>
        </QueryClientProvider>
        <ThemeSwitcher />
      </ThemeConfigProvider>
      <ProgressBar />
      <ToasterContainer />
    </ThemeProvider>
  );
};
