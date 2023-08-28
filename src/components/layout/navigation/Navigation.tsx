"use client";
import { FC } from "react";
import styles from "./Navigation.module.scss";
import { NavigationItem } from "./navigation-item/NavigationItem";
import { usePathname } from "next/navigation";
import { navigation } from "./Navigation.data";
import { PiUserCircleLight, PiUserLight } from "react-icons/pi";
interface Props {}

export const Navigation: FC<Props> = () => {
  const pathname = usePathname();
  return (
    <div className={styles.sidebar}>
      {navigation.map((item) => (
        <NavigationItem pathname={pathname} key={item.title} {...item} />
      ))}

      <div className={styles.user}>
        <div className={styles.avatar}>
          <PiUserLight className="text-3xl" />
        </div>
        <div className={styles.names}>
          <div className="font-semibold">Franclin Seint</div>
          <div className="text-gray-700">@FranclinSeint</div>
        </div>
        <div className={styles.info}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
