import { FC, PropsWithChildren } from "react";
import { Navigation } from "./navigation/Navigation";
import styles from "./Layout.module.scss";
import { SideBar } from "./sidebar/SideBar";
interface Props {}

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.layout}>
        <Navigation />
        <main className="flex-1 max-w-2xl pb-16 mobile:pb-0 border-x min-h-screen">{children}</main>
        <SideBar />
      </div>
    </>
  );
};
