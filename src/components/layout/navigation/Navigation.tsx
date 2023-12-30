import { FC } from "react";
import styles from "./Navigation.module.scss";
import { NavigationItem } from "./navigation-item/NavigationItem";
import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { navigation } from "./Navigation.data";
import { User } from "./user/User";
interface Props {}

export const Navigation: FC<Props> = () => {
  const pathname = usePathname();
  return (
    <div className={styles.sidebar}>
      {navigation.map((item) => {
        return <NavigationItem pathname={pathname} key={item.title} {...item} />;
      })}
      <User />
    </div>
  );
};
