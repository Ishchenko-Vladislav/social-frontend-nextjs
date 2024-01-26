"use client";
import { AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { useConversation } from "@/context/ConversationContext";
import { IConversation } from "@/services/conversation/conversation.interface";
import { ConversationService } from "@/services/conversation/conversation.service";
import { IUser } from "@/services/user/user.interface";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shadcn/ui/dialog";
import { useRef } from "react";
import { useRouter } from "next/navigation";
export const Recipient = (user: IUser) => {
  const { addConversation, conversation } = useConversation();
  const { push } = useRouter();
  const ref = useRef<HTMLButtonElement>(null);
  const { mutate: createConservation, isPending } = useMutation({
    mutationFn: (userId: string) => ConversationService.create(userId),
    onSuccess: (conv, variables, context) => {
      if (conversation.find((el) => el.id === conv.data.id)) {
        push("/messages/" + conv.data.id);
      } else {
        addConversation(conv.data as IConversation);
        push("/messages/" + conv.data.id);
      }
      if (ref && ref.current) {
        ref.current.click();
      }
      console.log("HERE NEW conservation", conv);
    },
    onError(error, variables, context) {
      // setLiked((prev) => !prev);
      // setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    },
    mutationKey: ["new_conservation"],
  });
  return (
    <>
      <button
        onClick={() => createConservation(user.id)}
        key={user.id}
        className={cn(
          "flex gap-2 px-4 py-2 hover:bg-secondary max-w-full w-full transition-colors items-center"
        )}
      >
        <div>
          <AvatarIconPrototype className="w-10 h-10" avatarPath={user.avatarPath} />
        </div>
        <div className={cn("flex flex-col gap-2 overflow-hidden", {})}>
          <div className="flex flex-col  items-start text-sm md:text-base">
            <div>
              <span className="font-bold ">{user.displayName}</span>
            </div>
            <div className="overflow-hidden truncate">
              <span className="text-muted-foreground">@{user.userName}</span>
            </div>
          </div>
          <div></div>
        </div>
      </button>
      <DialogClose ref={ref} />
    </>
  );
};
