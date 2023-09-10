import { INavigationItem } from "@/components/layout/navigation/navigation-item/NavigationItem";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";

interface Props extends INavigationItem {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const MenuItem: FC<Props> = ({ title, link, FirstIcon, setIsOpen }) => {
  return (
    <Link
      onClick={() => setIsOpen(false)}
      className="w-full active:bg-accent px-4 py-2"
      href={link}
    >
      <button className="flex items-center gap-5 text-xl ">
        <FirstIcon />
        <div>{title}</div>
      </button>
    </Link>
  );
};
