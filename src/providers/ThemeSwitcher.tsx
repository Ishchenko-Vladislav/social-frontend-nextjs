"use client";

import * as React from "react";
import { useConfig } from "@/context/ThemeConfig";

export function ThemeSwitcher() {
  const { config } = useConfig();

  React.useEffect(() => {
    document.body.classList.forEach((className) => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className);
      }
    });

    const theme = config.theme || null;
    if (theme) {
      return document.body.classList.add(`theme-${theme}`);
    }
  }, [config]);

  return null;
}
