import { IMessageDTO } from "@/services/conversation/conversation.interface";
import { cn } from "@/utils/utils";
import { FC } from "react";
import { motion } from "framer-motion";
interface Props extends IMessageDTO {}

export const MessagePlaceholder: FC<Props> = ({ ...message }) => {
  const isMe = true;
  return (
    <motion.div
      initial={{
        height: 0,
        opacity: 0,
      }}
      animate={{
        height: "auto",
        opacity: 1,
      }}
    >
      <div
        style={{
          wordBreak: "break-word",
        }}
        className={cn(
          "px-4  py-2 max-w-[80%] opacity-70 bg-primary w-fit text-primary-foreground text-base sm:text-lg",
          {
            ["ml-auto rounded-bl-3xl rounded-t-3xl rounded-br-sm"]: isMe,
            ["ml-auto rounded-bl-sm  rounded-br-3xl"]: !isMe,
            // ["rounded-full"]: nextTheSameUser,
            // ["rounded-tr-sm"]: lastInGroup && isMe,
          }
        )}
      >
        {message?.content}
      </div>
    </motion.div>
  );
};
