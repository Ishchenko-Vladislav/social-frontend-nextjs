import { IMessageRender } from "@/context/ConversationContext";
import { useSocket } from "@/context/SocketContext";
import { IMessage } from "@/services/conversation/conversation.interface";
import { ConversationService } from "@/services/conversation/conversation.service";
import { useEffect, useState } from "react";
interface IUseMessages {
  conversationId: string | undefined;
}
export const useMessages = (opt: IUseMessages) => {
  const [messages, setMessages] = useState<IMessageRender[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [hasNextData, setHasNextData] = useState<boolean>(true);

  const getMessages = async (convId: string, skip: number = 0) => {
    const res = await ConversationService.getMessages(convId, skip);
    return res;
  };

  useEffect(() => {
    setMessages([]);
    setHasNextData(true);
    return () => {};
  }, [opt.conversationId]);

  const getNextData = async () => {
    if (opt?.conversationId && hasNextData) {
      setIsPending(true);
      try {
        const res = await getMessages(opt?.conversationId, messages.length);
        if (res.data) {
          if (res.data.length === 0) {
            setHasNextData(false);
          } else {
            const data: IMessageRender[] = res.data.map((msg) => {
              return {
                withAnimation: false,
                msg,
              };
            });
            // console.log("HERE GET NEXT DATA", res.data);
            setMessages((prev) => [...prev, ...data]);
          }
        }
      } catch (error) {
      } finally {
        setIsPending(false);
      }
    }
  };

  return {
    messages,
    isPending,
    setMessages,
    getNextData,
  };
};
