import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const layout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default layout;
