"use client";
import {
  Dispatch,
  FC,
  FocusEvent,
  MouseEvent,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";
import { ITag, useSearch } from "@/hooks/useSearch";
import useDebounce from "@/hooks/useDebounce";
// import cn from "classnames";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { IUser } from "@/services/user/user.interface";
import { PiUserLight } from "react-icons/pi";
import Link from "next/link";
import { AvatarIcon, AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/utils";

interface Props {}

export const Search: FC<Props> = () => {
  const [searchTerms, setSearchTerms] = useState<string>("");
  const debouncedValue = useDebounce(searchTerms, 500);
  const searchParams = useSearchParams();
  const { data, isError, isLoading } = useSearch<IUser[] | ITag[]>({
    searchTerm: debouncedValue,
  });
  const [isOpen, setIsOpen] = useState(false);
  const { push } = useRouter();
  // const {} = use
  const pathname = usePathname();
  const onFocusHandler = (e: FocusEvent<HTMLDivElement>) => {
    setIsOpen(true);
  };
  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  }, []);
  const dd = () => {
    push("/explore" + "?" + createQueryString("q", searchTerms));
  };
  return (
    <div
      className={cn("relative", {
        ["hidden"]: pathname.includes("explore"),
      })}
    >
      <div className={styles.search}>
        <input
          data-close="false"
          className={styles.searchInput}
          onChange={({ target }) => setSearchTerms(target.value)}
          type="text"
          value={searchTerms}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dd();
              // console.log(searchTerms);
              // push(`/explore?q=${searchTerms}`);
            }
          }}
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
  const close = () => setIsOpen(false);

  return (
    <div onClick={onClickHandle} className={styles.searchBlock}>
      {data && !!data.length && !!searchTerms.length ? (
        data.map((el) => {
          if ((el as IUser)?.userName)
            return <SearchItem close={close} key={el.id} {...(el as IUser)} />;
          else return <SearchHashtag close={close} key={el.id} {...(el as ITag)} />;
        })
      ) : (
        <div className="p-3 text-center">Try searching for people, or hashtags of interest</div>
      )}
    </div>
  );
};

export const SearchHashtag: FC<
  ITag & {
    close: () => void;
  }
> = (tag) => {
  return (
    <Link
      onClick={close}
      href={`/explore?q=${tag.name}`}
      className="flex items-center gap-4  p-2 hover:bg-accent"
    >
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

export const SearchItem: FC<
  IUser & {
    close: () => void;
  }
> = (user) => {
  return (
    <Link
      onClick={close}
      href={`/${user.userName}`}
      className="flex gap-4 items-center hover:bg-accent p-2"
    >
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
