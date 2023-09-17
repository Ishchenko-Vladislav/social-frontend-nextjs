import { Profile } from "@/components/pages/profile/Profile";
import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: { userName: string };
}

const layout: FC<Props> = ({ children, params }) => {
  return (
    <>
      <Profile userName={params.userName} />
      {children}
    </>
  );
};

export default layout;
