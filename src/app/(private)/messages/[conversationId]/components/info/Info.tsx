"use client";
import { useConversation } from "@/context/ConversationContext";
import { useAuth } from "@/context/auth/Authorization";
// import { useConversation } from "@/hooks/conversation/useConversation";
import { IConversation, TConversationType } from "@/services/conversation/conversation.interface";
import { IUser } from "@/services/user/user.interface";
import { Skeleton } from "@/shadcn/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";
import { RxInfoCircled } from "react-icons/rx";
interface Props {}
interface IParams {
  conversationId: string;
}
export const Info: FC<Props> = () => {
  const { user } = useAuth();
  const params = useParams();
  const { push, back } = useRouter();
  // const { data, isLoading, isError, isPending } = useConversation(params.conversationId as string);
  const { selectedConversation, hasUnreadMessage } = useConversation();
  // console.log("NEW NEW NEW", data);

  if (!selectedConversation) {
    return <Skeleton className="h-14 w-full rounded-none" />;
  }

  // if (isError || !data) {
  //   return null;
  // }
  return (
    <div className="relative">
      <div className="w-full h-14 flex items-center justify-between px-2">
        <div
          aria-label="back"
          className="w-8 h-8 transition-colors rounded-full hover:bg-accent flex justify-center items-center cursor-pointer"
          onClick={() => back()}
        >
          <BiArrowBack />
        </div>
        <div className="text-xl">
          {selectedConversation.type === "private" ? (
            <div>{selectedConversation.users.filter((u) => u.id !== user.id)[0].displayName}</div>
          ) : (
            <div>
              <span>this group</span>
            </div>
          )}
        </div>
        <button
          onClick={() => push("/messages/" + params.conversationId + "/info")}
          className="w-10 h-10 rounded-full hover:bg-secondary transition-colors flex items-center justify-center"
        >
          <RxInfoCircled className="text-xl" />
        </button>
      </div>
      <div></div>
      {hasUnreadMessage ? (
        <div className="absolute -bottom-4 z-10 left-0 w-full h-5 bg-primary/70 select-none pointer-events-none text-primary-foreground backdrop-blur-sm flex justify-center">
          <span className="text-center text-sm tracking-wider">you have new message</span>
        </div>
      ) : null}
    </div>
  );
};
