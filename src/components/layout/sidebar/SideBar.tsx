"use client";
import { FC, useEffect } from "react";
import styles from "./SideBar.module.scss";
import { Search } from "./search/Search";
interface Props {}

export const SideBar: FC<Props> = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
    </div>
  );
};
