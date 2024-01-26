"use client";
// import { Search, SearchHashtag, SearchItem } from "@/components/layout/sidebar/search/Search";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ITag, useSearch } from "@/hooks/useSearch";
import { IUser } from "@/services/user/user.interface";
import useDebounce from "@/hooks/useDebounce";
import { Search, SearchHashtag, SearchItem } from "./components/search/Search";
import { useSearchBy } from "@/hooks/useSearchBy";
import { Post } from "@/components/ui/post/Post";
import { IPostShort } from "@/services/post/post.interface";
interface Props {}

const ExplorePage = (props: Props) => {
  const searchParams = useSearchParams();

  const searchTerms = searchParams.get("q");

  useEffect(() => {
    setSearchTerm(searchTerms ?? "");
    console.log("searchTerms --", searchTerms);

    return () => {};
  }, [searchTerms]);

  const debouncedValue = useDebounce(searchTerms ?? "", 500);

  // const { data, isError, isLoading } = useSearch<IUser[] | ITag[]>({
  //   searchTerm: debouncedValue,
  // });
  const { searchTerm, setSearchTerm, data } = useSearchBy();
  useEffect(() => {
    console.log("HERE DATA TERM", searchTerms, data);

    return () => {};
  }, [data]);
  return (
    <div className="p-4">
      <div>
        <Search />
      </div>
      <div>
        {data && !!data.length ? (
          data.map((el) => {
            if ((el as IUser)?.userName) return <SearchItem key={el.id} {...(el as IUser)} />;
            else return <Post queryKey="" {...(el as IPostShort)} />;
          })
        ) : searchTerms?.length !== 0 ? (
          <div className="p-3 text-center">Try searching for people, or hashtags of interest</div>
        ) : (
          <div>Not found</div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
