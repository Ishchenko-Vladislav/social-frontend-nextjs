"use client";
import { FC } from "react";
import styles from "./Navigation.module.scss";
import { NavigationItem } from "./navigation-item/NavigationItem";
import { usePathname } from "next/navigation";
import { navigation } from "./Navigation.data";
import { User } from "./user/User";
import { useWindowSize } from "@/hooks/useWindowSize";
interface Props {}

export const Navigation: FC<Props> = () => {
  const pathname = usePathname();
  const { width } = useWindowSize();
  return (
    <div className={styles.sidebar}>
      {navigation.map((item) => (
        <NavigationItem pathname={pathname} key={item.title} {...item} />
      ))}
      {width >= 500 && <User />}
    </div>
  );
};
