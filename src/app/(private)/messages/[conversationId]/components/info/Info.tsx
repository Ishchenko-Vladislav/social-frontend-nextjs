"use client";
import { useAuth } from "@/context/auth/Authorization";
import { useConversation } from "@/hooks/conversation/useConversation";
import { IConversation, TConversationType } from "@/services/conversation/conversation.interface";
import { IUser } from "@/services/user/user.interface";
import { Skeleton } from "@/shadcn/ui/skeleton";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { RxInfoCircled } from "react-icons/rx";
interface Props {}
interface IParams {
  conversationId: string;
}
export const Info: FC<Props> = () => {
  const { user } = useAuth();
  const params = useParams();
  const { push } = useRouter();
  const { data, isLoading, isError, isPending } = useConversation(params.conversationId as string);
  console.log("NEW NEW NEW", data);

  if (isPending) {
    return <Skeleton className="h-14 w-full rounded-none" />;
  }

  if (isError || !data) {
    return null;
  }
  return (
    <>
      <div className="w-full h-14 flex items-center justify-between px-2 backdrop-blur-sm">
        <div className="text-xl">
          {data.type === "private" ? (
            <div>{data.users.filter((u) => u.id !== user.id)[0].displayName}</div>
          ) : (
            <div>
              <span>this group</span>
            </div>
          )}
        </div>
        <button className="w-10 h-10 rounded-full hover:bg-secondary transition-colors flex items-center justify-center">
          <RxInfoCircled className="text-xl" />
        </button>
      </div>
      <div></div>
    </>
  );
};
