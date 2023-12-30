// "use client";

import { useConversation } from "@/hooks/conversation/useConversation";
import { useProfile } from "@/hooks/user/useProfile";
import { Info } from "./components/info/Info";
import { Skeleton } from "@/shadcn/ui/skeleton";
import { Input } from "@/shadcn/ui/input";
import { SendMessage } from "./components/send-message/SendMessage";
import { Messages } from "./components/messages/Messages";
// import Messages from "../page";
interface Props {
  params: {
    conversationId: string;
  };
}

const page = ({ params }: Props) => {
  return (
    <div className="flex flex-col border-r border-border h-full">
      <Info />
      {/* {isLoading ? <Skeleton className="h-12 w-full"></Skeleton> : <Info {...data} />} */}
      {/* {params.conversationId} */}

      <Messages />
      <SendMessage />
    </div>
  );
};

export default page;
