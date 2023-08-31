"use client";
import { useEffect, ReactNode } from "react";
import Cookie from "js-cookie";
import { TOKENS_ENUM } from "@/utils/constants";
import { useRouter, usePathname } from "next/navigation";

interface Props {}

const layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  useEffect(() => {
    const access_token = Cookie.get(TOKENS_ENUM.ACCESS_TOKEN);
    const refresh_token = Cookie.get(TOKENS_ENUM.REFRESH_TOKEN);
    if (access_token || refresh_token) return replace("/");
  }, [pathname]);

  return <>{children}</>;
};

export default layout;
