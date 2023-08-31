"use client";
import { FC, PropsWithChildren } from "react";
import { ProgressBar } from "./ProgressBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToasterContainer } from "./Toaster";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeConfigProvider } from "@/context/ThemeConfig";

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ThemeConfigProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ThemeConfigProvider>
      <ToasterContainer />
      <ProgressBar />
    </ThemeProvider>
  );
};
