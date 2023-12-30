"use client";
import { AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { ConversationService } from "@/services/conversation/conversation.service";
import { IUser } from "@/services/user/user.interface";
import { cn } from "@/utils/utils";
import { useMutation } from "@tanstack/react-query";

export const Recipient = (user: IUser) => {
  const { mutate: createConservation, isPending } = useMutation({
    mutationFn: (userId: string) => ConversationService.create(userId),
    onSuccess: (conservation, variables, context) => {
      console.log("HERE NEW conservation", conservation);
    },
    onError(error, variables, context) {
      // setLiked((prev) => !prev);
      // setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    },
    mutationKey: ["new_conservation"],
  });
  return (
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
  );
};
