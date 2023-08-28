"use client";
import { FC, useState } from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";
interface Props {}

export const Search: FC<Props> = () => {
  const [searchTerms, setSearchTerms] = useState<string>("");

  return (
    <div>
      <div className={styles.search}>
        <input type="text" placeholder="Search" />
        <BiSearch className={styles.icon} />
      </div>
    </div>
  );
};
