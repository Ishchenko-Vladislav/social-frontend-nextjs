import { FC } from "react";
import { IconType } from "react-icons";
import styles from "./NavigationItem.module.scss";
import Link from "next/link";
import cn from "classnames";
import Cookie from "js-cookie";
interface Props {}
export interface INavigationItem {
  link: string;
  title: string;
  mobile: boolean;
  FirstIcon: IconType;
  SecondIcon: IconType;
}

export const NavigationItem: FC<INavigationItem & { pathname?: string }> = ({
  title,
  link,
  pathname,
  mobile,
  SecondIcon,
  FirstIcon,
}) => {
  let url = link,
    here;
  if (link === "/profile") {
    const userName = Cookie.get("user_name") || "";
    // console.log(userName.slice(1));
    url = "/" + userName;
    here = pathname?.includes(url);
  } else {
    here = pathname === url;
  }

  return (
    <Link href={url} className={cn(styles.item, { [styles.mobile]: !mobile })}>
      <button className={styles.link}>
        <div>
          {here ? (
            <SecondIcon className={styles.iconActive} />
          ) : (
            <FirstIcon className={styles.iconNotActive} />
          )}
        </div>
        <div className={cn(styles.name, { [styles.here]: here })}>{title}</div>
      </button>
    </Link>
  );
};
