import { AuthService } from "@/services/auth/auth.service";
import { UserService } from "@/services/user/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { QUERY_KEY } from "@/utils/constants";
import { PostService } from "@/services/post/post.service";
import { IAxiosErrorData } from "../useAuth";
import { ConversationService } from "@/services/conversation/conversation.service";
export const useOwnProfile = () => {
  // const { replace } = useRouter();
  return useQuery({
    queryKey: [QUERY_KEY.own_profile],
    queryFn: () => UserService.getOwnProfile(),

    // onSuccess: (data) => {
    //   Cookie.set("user_name", data.userName);
    //   console.log("own profile was uploaded");
    // },
    // onError(err: AxiosError) {
    //   console.log("useProfile", err);
    // },
    // retry: 0,
    staleTime: 1000 * 60 * 60 * 24 * 365,
    // cacheTime: 1000 * 60 * 60 * 24 * 365,
    // keepPreviousData: true,
  });
};
export const useProfile = (userName: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.profile, { userName }],
    queryFn: () => UserService.getProfile(userName),
    // onError(err: AxiosError) {
    //   console.log("useProfile", err);
    // },
    // retry: 0,
    // keepPreviousData: true,
  });
};

// export const useRecipient = (conversationId: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEY.profile, { conversationId }],
//     queryFn: () => UserService.getProfile(userName),
//     // onError(err: AxiosError) {
//     //   console.log("useProfile", err);
//     // },
//     // retry: 0,
//     // keepPreviousData: true,
//   });
// };
// export const useFollowers = (userName: string) => {
//   // const { replace } = useRouter();
//   return useQuery({
//     queryKey: [QUERY_KEY.followers, { userName }],
//     queryFn: () => UserService.getFollowers(userName),
//     onError(err: AxiosError) {
//       console.log("useProfile", err);
//     },
//     // retry: 0,
//     // keepPreviousData: true,
//   });
// };
// export const useFollowings = (userName: string) => {
//   const { replace } = useRouter();
//   return useQuery({
//     queryKey: [QUERY_KEY.followings, { userName }],
//     queryFn: () => UserService.getFollowing(userName),
//     onError(err: AxiosError) {
//       console.log("useProfile", err);
//     },
//     // retry: 0,
//     // keepPreviousData: true,
//   });
// };
type TUseFollowProps = {
  isLocal?: boolean;
};
export const useFollow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => UserService.follow(userId),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.profile] });
    },
    onError(error: AxiosError<IAxiosErrorData, any>, variables, context) {
      return error;
    },
  });
};
