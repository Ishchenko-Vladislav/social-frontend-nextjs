import { useAuth } from "@/context/auth/Authorization";
import { IMessage } from "@/services/conversation/conversation.interface";
import { cn } from "@/utils/utils";
import { FC, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useInView } from "framer-motion";
import { useSocket } from "@/context/SocketContext";
import { motion } from "framer-motion";
import { IMessageRender } from "@/context/ConversationContext";
import { MessagePlaceholder } from "./MessagePlaceholder";
type Props = IMessageRender & {
  nextTheSameUser?: boolean;
  lastInGroup?: boolean;
  read?: boolean;
};

export const Message: FC<Props> = ({
  nextTheSameUser = false,
  lastInGroup = false,
  withAnimation = false,
  // read,
  // ...item
  msg: { read, ...otherMsg },
}) => {
  const [message, setMessage] = useState({ ...otherMsg });
  const { user } = useAuth();
  const socket = useSocket();
  // const isMe = message.msg.user.id === user.id;
  const isMe = message.user.id === user.id;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!read && isInView && !isMe) {
      socket.emit("message.read", message);
    }
  }, [isInView]);
  // console.log("CREATEDAT", message.createdAt, new Date(message.createdAt).toLocaleString());
  // if(message.status === 'pending') {
  //   return <MessagePlaceholder content="" />
  // }
  // const s = async () => {
  //   const res = await message.promise;
  //   if (res && res.data) {
  //     setMessage({
  //       status: "success",
  //       msg: res.data,
  //       promise: null,
  //     });
  //   }
  // };
  // useEffect(() => {
  //   // s();
  //   setMessage({ ...item });
  // }, [item]);
  return (
    <motion.div
      ref={ref}
      className={cn("flex flex-col", {
        ["items-end"]: isMe,
      })}
      initial={
        withAnimation
          ? {
              height: 0,
              opacity: 0,
            }
          : {
              height: "auto",
              opacity: 1,
            }
      }
      animate={{
        height: "auto",
        opacity: 1,
      }}
    >
      {/* {message.status === "pending" ? (
        <Pending {...message.msg} />
      ) : (
        <Success withAnimation={withAnimation} {...message} isMe={isMe} />
      )} */}
      <div
        style={{
          wordBreak: "break-word",
        }}
        className={cn(
          "px-4  py-2 max-w-[80%] whitespace-pre rounded-t-3xl bg-primary w-fit text-primary-foreground text-base sm:text-lg",
          {
            [" rounded-bl-3xl  rounded-br-sm"]: isMe,
            [" rounded-bl-sm  rounded-br-3xl"]: !isMe,
            ["rounded-3xl"]: nextTheSameUser,
            // ["rounded-tr-sm"]: lastInGroup && isMe,
          }
        )}
      >
        {message.content}
      </div>
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <span>{dayjs(message.createdAt)?.format("ddd h:mm A")}</span>

        {isMe ? (
          <>
            <span>•</span>
            <span>{read ? "seen" : "unseen"}</span>
          </>
        ) : null}
      </div>
    </motion.div>
  );
};
