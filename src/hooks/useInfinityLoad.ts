import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";
import { useScrollToEnd } from "./useScrollToEnd";
// import useInView from "./useInView";

type TUseInfinityLoad<T> = {
  fetchDataFn: ({ pageParam }: any) => Promise<T[]>;
  queryKey: any;
  ref?: RefObject<HTMLDivElement>;
};

export const useInfinityLoad = <T>({ fetchDataFn, queryKey, ref }: TUseInfinityLoad<T>) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey,
    queryFn: fetchDataFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.length ? pages.length : null;
      return nextPage;
    },
  });
  const handle = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };
  useScrollToEnd({ offset: 500, onScrollToEnd: handle, ref: ref });
  return {
    data,
    isFetchingNextPage,
    isPending,
  };
};
