"use client";
import { Button } from "@/shadcn/ui/button";
import { cn } from "@/utils/utils";
import { FC, useMemo } from "react";
import { NewMessageDialog } from "../../new-message-dialog/NewMessageDialog";
import { ConversationService } from "@/services/conversation/conversation.service";
import { IConversation } from "@/services/conversation/conversation.interface";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { QUERY_KEY } from "@/utils/constants";
import { ConversationItem } from "./conversation-item/ConversationItem";
import { ImSpinner6 } from "react-icons/im";

interface Props {
  isCollapsed: boolean;
}

export const Conversation: FC<Props> = ({ isCollapsed }) => {
  const fetchProjects = async ({ pageParam }: any) => {
    const res = await ConversationService.getConversation(pageParam);
    return res.data;
  };
  const { data, isFetchingNextPage } = useInfinityLoad<IConversation>({
    fetchDataFn: fetchProjects,
    queryKey: [QUERY_KEY.conversation],
  });
  const isNotEmpty = useMemo(() => {
    return !!(data && data.pages && data.pages.length > 0 && data.pages[0].length);
  }, [data]);
  console.log("conversation", data, isNotEmpty);
  return (
    <div
      className={cn("flex-1 flex flex-col", {
        ["justify-center"]: !isNotEmpty,
        [""]: isCollapsed,
      })}
    >
      {isNotEmpty ? (
        data!.pages.map((page) => {
          return page.map((conversation) => (
            <ConversationItem key={conversation.id} isCollapsed={isCollapsed} {...conversation} />
          ));
        })
      ) : (
        <div
          className={cn("px-2 text-xl flex flex-col gap-4 font-semibold items-center", {
            ["hidden"]: isCollapsed,
          })}
        >
          <div>
            <span>Welcome to your inbox!</span>
          </div>
          <NewMessageDialog>
            <Button className="uppercase p-6 rounded-full w-fit">write message</Button>
          </NewMessageDialog>
        </div>
      )}
      {isFetchingNextPage ? (
        <div className="py-5 flex justify-center items-center gap-2">
          <ImSpinner6 className="animate-spin" />
          <span>Loading</span>
        </div>
      ) : null}
    </div>
  );
};
