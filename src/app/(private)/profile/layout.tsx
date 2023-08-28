import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import { TOKENS_ENUM } from "@/utils/constants";
import { redirect } from "next/navigation";
interface Props {}

const layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default layout;
