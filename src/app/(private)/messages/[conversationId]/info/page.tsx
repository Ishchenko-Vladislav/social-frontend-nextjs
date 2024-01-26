"use client";
import { AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { HeaderBack } from "@/components/ui/header/HeaderBack";
import { useConversation } from "@/context/ConversationContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import Link from "next/link";

const page = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className="border-r border-border flex-1 h-full">
      <HeaderBack title="Conversation info" />
      <div>
        {!!selectedConversation &&
          selectedConversation.users.map((user) => (
            <Link
              key={user.id}
              href={"/" + user.userName}
              className="flex gap-1 px-2 py-1 items-center w-full hover:bg-secondary"
            >
              <AvatarIconPrototype avatarPath={user.avatarPath} />
              <div className="flex flex-col text-sm">
                <div className="font-semibold">{user.displayName}</div>
                <div className="text-muted-foreground">{user.userName}</div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default page;
