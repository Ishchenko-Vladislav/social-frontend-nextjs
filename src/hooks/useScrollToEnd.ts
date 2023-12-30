import { RefObject, useEffect } from "react";

interface UseScrollToEndOptions {
  offset?: number;
  onScrollToEnd: () => void;
  ref?: RefObject<HTMLDivElement>;
}

export const useScrollToEnd = ({ offset = 500, onScrollToEnd, ref }: UseScrollToEndOptions) => {
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || window.pageYOffset;

      if (documentHeight - (scrollTop + windowHeight) < offset) {
        onScrollToEnd();
      }
    };
    console.log("HERE NEW REF", ref);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [offset, onScrollToEnd]);
};
