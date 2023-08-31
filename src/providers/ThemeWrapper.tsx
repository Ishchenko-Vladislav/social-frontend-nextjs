"use client";

import { useConfig } from "@/hooks/useConfig";
// import { useConfig } from "@/hooks/use-config"
import cn from "classnames";
import { useEffect } from "react";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {
  defaultTheme?: string;
}

export function ThemeWrapper({ defaultTheme, children, className }: ThemeWrapperProps) {
  const { config } = useConfig();
  useEffect(() => {}, [config]);

  return (
    <div
      className={cn(`theme-${config.theme || defaultTheme}`, "w-full", className)}
      //   style={
      //     {
      //       "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
      //     } as React.CSSProperties
      //   }
    >
      {children}
    </div>
  );
}
