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
        <main className={styles.main}>{children}</main>
        <SideBar />
      </div>
    </>
  );
};
