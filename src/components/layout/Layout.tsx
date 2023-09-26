import { FC, PropsWithChildren } from "react";
import { Navigation } from "./navigation/Navigation";
import styles from "./Layout.module.scss";
import { SideBar } from "./sidebar/SideBar";
import { SideMenu } from "./side-menu/SideMenu";
interface Props {}

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className={styles.layout}>
        <Navigation />
        <main className={styles.main}>
          <SideMenu />
          <div className="relative min-h-screen flex flex-col">{children}</div>
        </main>
        <SideBar />
      </div>
    </>
  );
};
