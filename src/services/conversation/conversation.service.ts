import { axiosInstance } from "@/api/instance";
import { API_URL, CONVERSATION_ROUTE } from "@/utils/constants";
import {
  IConversation,
  ICreatedConversationResponse,
  IMessage,
  IMessageDTO,
} from "./conversation.interface";
import { sleep } from "@/utils/utils";

export const ConversationService = {
  create: (userId: string) => {
    return axiosInstance.post<ICreatedConversationResponse>(
      API_URL + CONVERSATION_ROUTE.createConversation + userId
    );
  },
  getConversation: (skip: number, take: number) => {
    return axiosInstance.get<IConversation[]>(API_URL + CONVERSATION_ROUTE.getConversation, {
      params: {
        skip,
        take,
      },
    });
  },
  getConversationById: (conversationId: string) => {
    return axiosInstance.get<IConversation>(
      API_URL + CONVERSATION_ROUTE.getConversationById + conversationId
    );
  },

  getMessages: (conversationId: string, skip: number) => {
    return axiosInstance.get<IMessage[]>(
      API_URL + CONVERSATION_ROUTE.getMessages + conversationId,
      {
        params: {
          skip,
        },
      }
    );
  },
  sendMessage: async (conversationId: string, message: IMessageDTO) => {
    // await sleep(5000);
    return axiosInstance.post<IMessage>(
      API_URL + CONVERSATION_ROUTE.sendMessage + conversationId,
      message
    );
  },
};
