import { Layout } from "@/components/layout/Layout";
import { AuthorizationProvider } from "@/context/auth/Authorization";
import { ReactNode } from "react";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout>
      <AuthorizationProvider>{children}</AuthorizationProvider>
    </Layout>
  );
};
export default layout;
