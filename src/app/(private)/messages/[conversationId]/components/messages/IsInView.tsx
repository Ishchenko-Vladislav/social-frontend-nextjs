"use client";
import { useConversation } from "@/context/ConversationContext";
import { useInView } from "framer-motion";
import { FC, useEffect, useRef } from "react";

interface Props {}

export const IsInView: FC<Props> = () => {
  const ref = useRef(null);
  const { getNextData } = useConversation();
  const isInView = useInView(ref);
  useEffect(() => {
    if (isInView) {
      //   console.log("NOW NEED LOAD MESSAGE");
      getNextData();
    }

    return () => {};
  }, [isInView]);
  return <div ref={ref}></div>;
};
