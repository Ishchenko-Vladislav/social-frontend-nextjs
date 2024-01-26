import { AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { useAuth } from "@/context/auth/Authorization";
import { IConversation } from "@/services/conversation/conversation.interface";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC } from "react";

interface Props extends IConversation {
  isCollapsed: boolean;
}

export const ConversationItem: FC<Props> = ({ isCollapsed, ...conversation }) => {
  const { conversationId } = useParams();
  const { user } = useAuth();
  const recipient = conversation.users.filter((u) => u.id !== user.id);
  console.log(conversation);
  const isNotRead = !!(
    conversation.lastMessageSent &&
    conversation.lastMessageSent.user.id !== user.id &&
    !conversation.lastMessageSent.read
  );
  return (
    <Link
      href={"/messages/" + conversation.id}
      className={cn(
        "flex gap-2 px-2 hover:bg-secondary max-w-full w-full transition-colors h-16 shrink-0 items-center",
        {
          ["justify-center  py-3 px-1"]: isCollapsed,
          ["border-r-4 border-primary "]: conversationId === conversation.id,
          ["bg-secondary"]: isNotRead,
        }
      )}
    >
      <div className="">
        <AvatarIconPrototype avatarPath={recipient[0].avatarPath} />
      </div>
      <div
        className={cn("flex flex-col overflow-hidden", {
          ["hidden"]: isCollapsed,
        })}
      >
        <div className="flex gap-2 text-sm md:text-base">
          <div>
            <span className="font-bold">{recipient[0].displayName}</span>
          </div>
          <div className="overflow-hidden truncate">
            <span className="text-muted-foreground">@{recipient[0].userName}</span>
          </div>
        </div>
        <div className="overflow-hidden whitespace-nowrap truncate">
          <span className="text-ellipsis">{conversation.lastMessageSent?.content}</span>
        </div>
      </div>
    </Link>
  );
};
