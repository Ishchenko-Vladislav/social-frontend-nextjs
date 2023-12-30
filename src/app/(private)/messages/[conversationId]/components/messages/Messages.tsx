"use client";
import { useMessages } from "@/hooks/conversation/useMessages";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { IMessage } from "@/services/conversation/conversation.interface";
import { ConversationService } from "@/services/conversation/conversation.service";
import { QUERY_KEY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { Message } from "./message/Message";

interface Props {}

export const Messages: FC<Props> = () => {
  const params = useParams();
  // const [messages, setMessages] = useState<IMessage[]>([])
  // const fetchProjects = async ({ pageParam }: any) => {
  //   const res = await ConversationService.getMessages(params.conversationId as string, pageParam);
  //   return res.data;
  // };
  const { messages } = useMessages({
    conversationId: params.conversationId as string,
  });
  // const {data} = useQuery({
  //   queryKey: ['messages', params.conversationId],
  //   queryFn: async () => {
  //     const res = await ConversationService.getMessages(params.conversationId as string, messages.length)
  //     if(res.data) {
  //       setMessages(prev => [])
  //     }
  //     return res.data
  //   },
  // })
  // const { data, isFetchingNextPage, isPending } = useInfinityLoad<IMessage>({
  //   fetchDataFn: fetchProjects,
  //   queryKey: [QUERY_KEY.messages, params.conversationId],
  // });
  console.log("here new messgaaes", messages);
  return (
    <div className="flex-1 px-2 gap-1 flex-col flex">
      {messages && messages.length > 0
        ? messages.map((message, index, arr) => {
            const nextTheSameUser = message.user.id === arr[index + 1]?.user.id ?? null;
            // const prevTheSameUser = message.user.id === arr[index - 1]?.user.id ?? null
            const lastInGroup = !nextTheSameUser
              ? message.user.id === arr[index - 1]?.user.id ?? null
              : false;
            return (
              <Message
                nextTheSameUser={nextTheSameUser}
                lastInGroup={lastInGroup}
                key={message.id}
                {...message}
              />
            );
          })
        : null}
    </div>
  );
};
