"use client";
import { Layout } from "@/components/layout/Layout";
import { SocketProvider } from "@/context/SocketContext";
import { AuthorizationProvider } from "@/context/auth/Authorization";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode } from "react";
const layout = (props: { children: ReactNode; publish: ReactNode }) => {
  return (
    <AuthorizationProvider>
      <SocketProvider>
        <Layout>
          {props.children}
          {/* {segments === "bbb" && (
          <div>
            <Link href="/" className="w-screen h-screen bg-black/10 inset-0 absolute" />
            <div className="bg-white p-5">asdasd</div>
          </div>
        )} */}
        </Layout>
      </SocketProvider>
    </AuthorizationProvider>
  );
};
export default layout;
