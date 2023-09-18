import { FC } from "react";
import styles from "./Navigation.module.scss";
import { NavigationItem } from "./navigation-item/NavigationItem";
import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { navigation } from "./Navigation.data";
import { User } from "./user/User";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useAuth } from "@/context/auth/Authorization";
interface Props {}

export const Navigation: FC<Props> = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  return (
    <div className={styles.sidebar}>
      {navigation.map((item) => {
        if (item.link === "/profile") item.link = "/" + user.userName;
        return <NavigationItem pathname={pathname} key={item.title} {...item} />;
      })}
      <User />
    </div>
  );
};
