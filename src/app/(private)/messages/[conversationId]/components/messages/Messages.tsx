"use client";
import { useMessages } from "@/hooks/conversation/useMessages";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { IMessage, IMessageDTO } from "@/services/conversation/conversation.interface";
import { ConversationService } from "@/services/conversation/conversation.service";
import { QUERY_KEY } from "@/utils/constants";
import { useMutationState, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { Message } from "./message/Message";
import { useSocket } from "@/context/SocketContext";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { MessagePlaceholder } from "./message/MessagePlaceholder";
import { useConversation } from "@/context/ConversationContext";
import { useInView } from "framer-motion";
import { IsInView } from "./IsInView";
import { ImSpinner6 } from "react-icons/im";
import { IoMdArrowRoundDown } from "react-icons/io";
interface Props {}

export const Messages: FC<Props> = () => {
  const params = useParams();
  const { messages, hasUnreadMessage, isPendingMessage } = useConversation();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const refElement = useRef<HTMLButtonElement>(null);
  // const data: IMessageDTO[] = useMutationState({
  //   // this mutation key needs to match the mutation key of the given mutation (see above)
  //   filters: { mutationKey: ["new-message"], status: "pending" },
  //   select: (mutation) => mutation.state.variables as IMessageDTO,
  // });
  // // console.log("HERE NEW SEND MESAGE --------", data);
  const scrollHandle = () => {
    if (refElement && refElement.current && ref && ref.current) {
      // refElement.current.scrollTop = ref.current.scrollTop;
      // console.log(ref.current.scrollTop);
      if (ref.current.scrollTop < -300) {
        refElement.current.style.display = "flex";
      } else {
        refElement.current.style.display = "none";
      }
      const top =
        ref.current.scrollTop + ref.current.offsetHeight - refElement.current.offsetHeight - 20;
      refElement.current.style.top = top + "px";
    }
    // console.log("ref.current", ref.current);
  };
  const handleScrollToBottom = () => {
    if (ref && ref.current) {
      ref.current.scrollTop = 0;
    }
  };
  useEffect(() => {
    setMounted(true);
    if (ref && ref.current) {
      ref.current.addEventListener("scroll", scrollHandle);
    }
    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener("scroll", scrollHandle);
      }
    };
  }, []);
  // console.log(ref);
  return (
    <div ref={ref} className="flex flex-col-reverse gap-1 overflow-y-auto flex-1 p-2 relative">
      {isPendingMessage ? (
        <div className="py-5 flex justify-center items-center gap-2">
          <ImSpinner6 className="animate-spin" />
          <span>Loading</span>
        </div>
      ) : null}
      {messages && messages.length > 0
        ? messages.map((message, index, arr) => {
            const nextTheSameUser = message.msg.user.id === arr[index - 1]?.msg.user.id ?? null;
            // const prevTheSameUser = message.user.id === arr[index - 1]?.user.id ?? null
            const lastInGroup = !nextTheSameUser
              ? message.msg.user.id === arr[index + 1]?.msg.user.id ?? null
              : false;
            return (
              <Message
                nextTheSameUser={nextTheSameUser}
                lastInGroup={lastInGroup}
                key={message.msg.id}
                {...message}
              />
            );
          })
        : null}

      {mounted ? <IsInView /> : null}
      <button
        ref={refElement}
        style={{
          display: "none",
        }}
        onClick={handleScrollToBottom}
        className="absolute rounded-full bg-background hover:shadow right-5 top-5 w-12 h-8 border-2 border-primary flex justify-center items-center"
      >
        <IoMdArrowRoundDown />
      </button>
    </div>
    // </ScrollArea>
    // </div>
  );
};
