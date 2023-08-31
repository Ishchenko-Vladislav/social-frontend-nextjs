import { FC } from "react";
import { IconType } from "react-icons";
import styles from "./NavigationItem.module.scss";
import Link from "next/link";
import cn from "classnames";
interface Props {}
export interface INavigationItem {
  link: string;
  title: string;
  FirstIcon: IconType;
  SecondIcon: IconType;
}

export const NavigationItem: FC<INavigationItem & { pathname: string }> = ({
  title,
  link,
  pathname,
  SecondIcon,
  FirstIcon,
}) => {
  const here = pathname === link;
  return (
    <Link href={link} className={styles.item}>
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
