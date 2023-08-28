import { Layout } from "@/components/layout/Layout";
import { ReactNode } from "react";
const layout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};
export default layout;
