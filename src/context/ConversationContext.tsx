"use client";
import { useMessages } from "@/hooks/conversation/useMessages";
import {
  IConversation,
  IMessage,
  IMessageDTO,
} from "@/services/conversation/conversation.interface";
import { useParams } from "next/navigation";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSocket } from "./SocketContext";
import { ConversationService } from "@/services/conversation/conversation.service";
import { AxiosResponse } from "axios";
import { useAuth } from "./auth/Authorization";
interface IConversationContext {
  messages: IMessageRender[];
  conversation: IConversation[];
  addConversation: (conversation: IConversation) => void;
  hasUnreadMessage: boolean;
  addMessages: (message: IMessageRender) => void;
  getNextData: () => void;
  isPendingMessage: boolean;
  selectedConversation: IConversation | null;
}
const ConversationContext = createContext({} as IConversationContext);
export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) console.log("you must use in socket provider");

  return context;
};
export interface IMessageRender {
  withAnimation?: boolean;
  msg: IMessage;
  // status: "success" | "pending";
  // promise: Promise<IMessage> | null;
}
// export type IMessageRender =
//   | {
//       status: "success";
//       withAnimation: boolean;
//       promise: null;
//       msg: IMessage;
//     }
//   | {
//       status: "pending";
//       withAnimation: boolean;
//       // promise: Promise<IMessage>;
//       promise: Promise<AxiosResponse<IMessage, any>>;
//       msg: IMessageDTO;
//     };
export const ConversationProvider: FC<PropsWithChildren> = ({ children }) => {
  const params = useParams();
  const socket = useSocket();
  const { user } = useAuth();
  // const [messages, setMessages] = useState<IMessageRender[]>([]);
  const [conversation, setConversation] = useState<IConversation[]>([]);
  const {
    messages,
    setMessages,
    getNextData,
    isPending: isPendingMessage,
  } = useMessages({
    conversationId: params?.conversationId as string,
  });
  const conversationRef = useRef<IConversation[]>();
  conversationRef.current = conversation;
  const addConversation = (conversation: IConversation) => {
    setConversation((prev) => [conversation, ...prev]);
  };
  const addMessages = (message: IMessageRender) => {
    setMessages((prev) => [message, ...prev]);
  };

  // const getMessages = async (convId: any, skip: number = 0, take: number = 50) => {
  //   const res = await ConversationService.getMessages(convId, skip);
  //   return res;
  // };
  const getConversation = async (skip: number = 0, take: number = 50) => {
    const res = await ConversationService.getConversation(skip, take);
    return res;
  };

  // useEffect(() => {
  //   // setMessages([]);
  //   if (params?.conversationId) {
  //     // getMessages(params?.conversationId, 0)
  //     //   .then((res) => {
  //     //     const data: IMessageRender[] = res.data.map((msg) => {
  //     //       return {
  //     //         withAnimation: false,
  //     //         msg,
  //     //       };
  //     //     });
  //     //     setMessages(data);
  //     //   })
  //     //   .catch((err) => console.log(err));
  //   }

  //   return () => {};
  // }, [params?.conversationId]);

  useEffect(() => {
    getConversation().then((res) => setConversation(res.data));
    return () => {};
  }, []);
  useEffect(() => {
    return () => {};
  }, [conversation]);

  const hasUnreadMessage = useMemo(() => {
    return !!messages.some((m) => {
      if (m.msg.user.id !== user.id && !m.msg.read) return true;
      else return false;
    });
  }, [messages]);

  const selectedConversation = useMemo(() => {
    return conversation.find((el) => el.id === params?.conversationId) ?? null;
  }, [params?.conversationId, conversation]);
  useEffect(() => {
    socket!.on("connected", () => console.log("connected"));
    socket!.on("onread", (msg: IMessage) => {
      setMessages((prev) => {
        if (prev.length === 0) return prev;
        const c = prev.map((m) => {
          if (m.msg.id === msg.id) {
            const data: IMessageRender = {
              ...m,
              msg: {
                ...msg,
                read: true,
              },
            };
            console.log(":SET READ", data, msg);

            return data;
          } else return m;
        });
        // console.log("-----------------------, ", c);
        return c;
      });
      setConversation((prev) => {
        return prev.map((conv) => {
          if (conv.lastMessageSent && conv.lastMessageSent.id === msg.id) {
            return {
              ...conv,
              lastMessageSent: {
                ...conv.lastMessageSent,
                read: true,
              },
            };
          } else return conv;
        });
      });
    });
    socket!.on("onMessage", async (newMessage: IMessage) => {
      const msg: IMessageRender = {
        msg: newMessage,
        withAnimation: true,
      };
      setMessages((prev) => {
        // if (prev.length === 0) return prev;
        if (prev.length > 0 && prev[0].msg.conversation.id === msg.msg.conversation.id) {
          return [msg, ...prev];
        } else return prev;
      });
      if (conversationRef?.current?.find((c) => c.id === msg.msg.conversation.id)) {
        setConversation((prev) => {
          return prev
            .map((conv) => {
              if (conv.id === msg.msg.conversation.id) {
                return {
                  ...conv,
                  lastMessageSent: msg.msg,
                };
              } else {
                return conv;
              }
            })
            .sort((a, b) => {
              return (
                new Date(b.lastMessageSent!.createdAt).getTime() -
                new Date(a.lastMessageSent!.createdAt).getTime()
              );
            });
        });
      } else {
        const conv = await ConversationService.getConversationById(msg.msg.conversation.id);
        setConversation((prev) => {
          console.log("conversation.end", conv.data, prev);

          return [conv.data, ...prev];
        });
      }
    });
    return () => {
      socket!.off("connected");
      socket!.off("onMessage");
      socket!.off("onread");
    };
  }, []);

  return (
    <ConversationContext.Provider
      value={{
        hasUnreadMessage,
        isPendingMessage,
        messages,
        conversation,
        selectedConversation,
        addConversation,
        addMessages,
        getNextData,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
