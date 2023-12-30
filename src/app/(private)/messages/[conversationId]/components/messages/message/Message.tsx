import { useAuth } from "@/context/auth/Authorization";
import { IMessage } from "@/services/conversation/conversation.interface";
import { cn } from "@/utils/utils";
import { FC } from "react";

interface Props extends IMessage {
  nextTheSameUser: boolean;
  lastInGroup: boolean;
}

export const Message: FC<Props> = ({ nextTheSameUser, lastInGroup, ...message }) => {
  const { user } = useAuth();
  const isMe = message.user.id === user.id;
  return (
    <div>
      <div
        className={cn(
          "px-4 py-2 max-w-[80%]  bg-primary w-fit text-primary-foreground text-base sm:text-lg",
          {
            ["ml-auto rounded-bl-3xl rounded-t-3xl rounded-br-sm"]: isMe,
            ["ml-auto rounded-bl-sm  rounded-br-3xl"]: !isMe,
            ["rounded-full"]: nextTheSameUser,
            // ["rounded-tr-sm"]: lastInGroup && isMe,
          }
        )}
      >
        {message.content}
      </div>
    </div>
  );
};
