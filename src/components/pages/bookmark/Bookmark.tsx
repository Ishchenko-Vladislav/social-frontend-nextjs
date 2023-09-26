import { HeaderBack } from "@/components/ui/header/HeaderBack";
import { FC } from "react";
import { BookmarksItem } from "./bookmarks-item/BookmarksItem";

interface Props {}

export const Bookmark: FC<Props> = () => {
  return (
    <div className="h-full flex flex-col flex-1">
      <HeaderBack title="Bookmarks" />
      <BookmarksItem />
    </div>
  );
};
