"use client";
import {
  Dispatch,
  FC,
  FocusEvent,
  MouseEvent,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";
import { ITag, useSearch } from "@/hooks/useSearch";
import useDebounce from "@/hooks/useDebounce";
import cn from "classnames";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { IUser } from "@/services/user/user.interface";
import { PiUserLight } from "react-icons/pi";
import Link from "next/link";
import { AvatarIcon, AvatarIconPrototype } from "@/components/ui/avatar/Avatar";

interface Props {}

export const Search: FC<Props> = () => {
  const [searchTerms, setSearchTerms] = useState<string>("");
  const debouncedValue = useDebounce(searchTerms, 500);
  const { data, isError, isLoading } = useSearch(debouncedValue);
  const [isOpen, setIsOpen] = useState(false);

  const onFocusHandler = (e: FocusEvent<HTMLDivElement>) => {
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <div className={styles.search}>
        <input
          data-close="false"
          className={styles.searchInput}
          onChange={({ target }) => setSearchTerms(target.value)}
          type="text"
          placeholder="Search"
          onFocus={onFocusHandler}
        />
        <BiSearch className={styles.icon} />
        {isOpen && <FindBlock setIsOpen={setIsOpen} searchTerms={searchTerms} data={data} />}
      </div>
    </div>
  );
};

interface IFindBlock {
  data: IUser[] | ITag[] | undefined;
  searchTerms: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const FindBlock: FC<IFindBlock> = ({ data, searchTerms, setIsOpen }) => {
  const clickHandler = (e: any) => {
    if (e.target.dataset.close === "false") return;
    setIsOpen(false);
  };
  useEffect(() => {
    window.addEventListener("click", clickHandler);
    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, []);
  const onClickHandle = (e: MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div onClick={onClickHandle} className={styles.searchBlock}>
      {data && !!data.length && !!searchTerms.length ? (
        data.map((el) => {
          if ((el as IUser)?.userName) return <SearchItem key={el.id} {...(el as IUser)} />;
          else return <SearchHashtag key={el.id} {...(el as ITag)} />;
        })
      ) : (
        <div className="p-3 text-center">try searching for people, or hashtags of interest</div>
      )}
    </div>
  );
};

export const SearchHashtag: FC<ITag> = (tag) => {
  return (
    <Link href={"/explore"} className="flex items-center gap-4  p-2 hover:bg-accent">
      <div className="text-2xl">
        <BiSearch />
      </div>
      <div>
        <div className="">{tag.name}</div>
        <div className="text-xs">{tag.postcount} posts</div>
      </div>
    </Link>
  );
};

export const SearchItem: FC<IUser> = (user) => {
  return (
    <Link href={`/${user.userName}`} className="flex gap-4 items-center hover:bg-accent p-2">
      {/* <Avatar className="w-8 h-8 shrink-0 border-0">
        <AvatarImage src={user?.avatarPath || ""} />
        <AvatarFallback className="dark:bg-muted-foreground bg-muted-foreground">
          <PiUserLight className="text-2xl" />
        </AvatarFallback>
      </Avatar> */}
      <AvatarIconPrototype avatarPath={user.avatarPath} />
      <div className="flex flex-col">
        <div className="text-sm">{user.displayName}</div>
        <div className="text-muted-foreground text-xs">@{user.userName}</div>
      </div>
    </Link>
  );
};
