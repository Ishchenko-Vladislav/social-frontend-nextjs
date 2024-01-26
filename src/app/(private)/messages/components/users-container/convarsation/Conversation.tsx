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
import { useConversation } from "@/context/ConversationContext";
import { ScrollArea } from "@/shadcn/ui/scroll-area";

interface Props {
  isCollapsed: boolean;
  term: string;
}

export const Conversation: FC<Props> = ({ isCollapsed, term }) => {
  const { conversation } = useConversation();
  const filtered = useMemo(() => {
    if (term.length > 0) {
      return conversation.filter((el) => {
        return el.users.some((user) => {
          if (user.displayName.includes(term) || user.userName.includes(term)) return true;
        });
      });
    }
  }, [term]);
  return (
    <div className="flex flex-col gap-1 overflow-y-scroll pl-2">
      {conversation && conversation.length > 0 ? (
        term ? (
          !!filtered && filtered.length > 0 ? (
            filtered.map((conv) => {
              return <ConversationItem key={conv.id} isCollapsed={isCollapsed} {...conv} />;
            })
          ) : (
            <div className="w-full flex flex-col gap-1 text-center justify-center">
              <div>
                <span
                  style={{
                    wordBreak: "break-word",
                  }}
                  className="text-xl font-bold"
                >
                  No result for "{term}"
                </span>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">
                  The term you entered did not bring up any results
                </span>
              </div>
            </div>
          )
        ) : (
          conversation.map((conv) => {
            return <ConversationItem key={conv.id} isCollapsed={isCollapsed} {...conv} />;
          })
        )
      ) : (
        // filtered
        // .sort(
        //   (b, a) =>
        //     new Date(a.updatedAt).getMilliseconds() - new Date(b.updatedAt).getMilliseconds()
        // )
        // .sort((a, b) => {
        //   console.log(
        //     "sort",
        //     new Date(a.updatedAt).getMilliseconds(),
        //     new Date(b.updatedAt).getMilliseconds()
        //   );
        //   if (new Date(a.updatedAt).getMilliseconds() < new Date(b.updatedAt).getMilliseconds()) {
        //     return -1;
        //   } else {
        //     return 1;
        //   }
        // })

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
    </div>
  );

  // return (
  //   <div
  //     className={cn("flex-1 flex flex-col", {
  //       ["justify-center"]: !isNotEmpty,
  //       [""]: isCollapsed,
  //     })}
  //   >
  //     {isNotEmpty ? (
  //       data!.pages.map((page) => {
  //         return page.map((conversation) => (
  //           <ConversationItem key={conversation.id} isCollapsed={isCollapsed} {...conversation} />
  //         ));
  //       })
  //     ) : (
  //       <div
  //         className={cn("px-2 text-xl flex flex-col gap-4 font-semibold items-center", {
  //           ["hidden"]: isCollapsed,
  //         })}
  //       >
  //         <div>
  //           <span>Welcome to your inbox!</span>
  //         </div>
  //         <NewMessageDialog>
  //           <Button className="uppercase p-6 rounded-full w-fit">write message</Button>
  //         </NewMessageDialog>
  //       </div>
  //     )}
  //     {isFetchingNextPage ? (
  //       <div className="py-5 flex justify-center items-center gap-2">
  //         <ImSpinner6 className="animate-spin" />
  //         <span>Loading</span>
  //       </div>
  //     ) : null}
  //   </div>
  // );
};
