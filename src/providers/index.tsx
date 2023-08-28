"use client";
import { FC, PropsWithChildren } from "react";
import { ProgressBar } from "./ProgressBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ToasterContainer } from "./Toaster";
export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <ToasterContainer />
      <ProgressBar />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};
