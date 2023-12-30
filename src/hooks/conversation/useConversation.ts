import { ConversationService } from "@/services/conversation/conversation.service";
import { QUERY_KEY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useConversation = (conversationId: string) => {
  const { push, replace } = useRouter();
  return useQuery({
    queryKey: [QUERY_KEY.conversation_by_id, { conversationId }],
    queryFn: async () => {
      try {
        const res = await ConversationService.getConversationById(conversationId);
        if ("status" in res.data && res.data.status === 400) {
          push("/messages");
        }
        return res.data;
      } catch (error) {
        replace("/messages");
      }
    },

    // onError(err: AxiosError) {
    //   console.log("useProfile", err);
    // },
    // retry: 0,
    // keepPreviousData: true,
  });
};
