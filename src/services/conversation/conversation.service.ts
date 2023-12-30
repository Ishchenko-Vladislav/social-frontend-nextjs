import { axiosInstance } from "@/api/instance";
import { API_URL, CONVERSATION_ROUTE } from "@/utils/constants";
import {
  IConversation,
  ICreatedConversationResponse,
  IMessage,
  IMessageDTO,
} from "./conversation.interface";

export const ConversationService = {
  create: (userId: string) => {
    return axiosInstance.post<ICreatedConversationResponse>(
      API_URL + CONVERSATION_ROUTE.createConversation + userId
    );
  },
  getConversation: (pageParam: number) => {
    return axiosInstance.get<IConversation[]>(API_URL + CONVERSATION_ROUTE.getConversation, {
      params: {
        pageParam,
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
  sendMessage: (conversationId: string, message: IMessageDTO) => {
    return axiosInstance.post<IMessage>(
      API_URL + CONVERSATION_ROUTE.sendMessage + conversationId,
      message
    );
  },
};
