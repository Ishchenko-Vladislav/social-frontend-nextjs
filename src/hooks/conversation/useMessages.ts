import { IMessage } from "@/services/conversation/conversation.interface";
import { ConversationService } from "@/services/conversation/conversation.service";
import { useEffect, useState } from "react";
interface IUseMessages {
  conversationId: string;
}
export const useMessages = ({ conversationId }: IUseMessages) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const getMessages = async () => {
    const res = await ConversationService.getMessages(conversationId, messages.length);
    return res;
  };

  useEffect(() => {
    getMessages().then((res) => setMessages(res.data));

    return () => {};
  }, [conversationId]);

  return {
    messages,
  };
};
