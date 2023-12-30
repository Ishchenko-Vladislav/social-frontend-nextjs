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
  return (
    <Link
      href={"/messages/" + conversation.id}
      className={cn("flex gap-2 px-2 py-3 hover:bg-secondary max-w-full w-full transition-colors", {
        "justify-center": isCollapsed,
        ["border-r-4 border-primary"]: conversationId === conversation.id,
      })}
    >
      <div>
        <AvatarIconPrototype avatarPath={recipient[0].avatarPath} />
      </div>
      <div
        className={cn("flex flex-col gap-2 overflow-hidden", {
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
        <div></div>
      </div>
    </Link>
  );
};
