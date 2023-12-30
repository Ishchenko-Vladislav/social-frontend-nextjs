import { FC, PropsWithChildren } from "react";
import { Navigation } from "./navigation/Navigation";
import styles from "./Layout.module.scss";
import { SideBar } from "./sidebar/SideBar";
import { SideMenu } from "./side-menu/SideMenu";
import { cn } from "@/utils/utils";
import { usePathname } from "next/navigation";
interface Props {}

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  return (
    <>
      <div className={styles.layout}>
        <Navigation />
        <main
          className={cn(
            "flex-1 max-w-2xl h-fit pb-16 mobile:pb-0 min-h-screen border-border border-r",
            {
              ["border-r-0 max-w-[62rem] xl:max-w-[66rem] w-full"]: pathname.includes("/messages"),
            }
          )}
        >
          <SideMenu />
          <div className="relative min-h-screen flex flex-col">{children}</div>
        </main>
        <SideBar />
      </div>
    </>
  );
};
