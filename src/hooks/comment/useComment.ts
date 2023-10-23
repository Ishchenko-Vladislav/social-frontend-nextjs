import { IComment, ICommentDto } from "@/services/comment/comment.interface";
import { CommentService } from "@/services/comment/comment.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IAxiosErrorData } from "../useAuth";
import { AxiosError } from "axios";
import { QUERY_KEY } from "@/utils/constants";

export const useSendComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ comment, postId }: { comment: ICommentDto; postId: string }) => {
      const res = CommentService.sendComment(comment, postId);
      //   toast.promise(res, {
      //     loading: "Loading",
      //     success: "Successfully",
      //     error: (err) => err?.response?.data.message,
      //   });
      const result = await res;
      return result;
    },
    onSuccess: (data, variables, context) => {
      //   AuthService.setTokensToCookie(data);
      //   push("/");
      queryClient.setQueriesData<IComment[]>([QUERY_KEY.comments], (oldData) => {
        if (!oldData) return [];
        const updateData = [data, ...oldData];
        // const updateData = oldData.map((el) => {
        //   if (el.id === data.id) {
        //     return { ...el, likesCount: data.likesCount, likes: data.likes };
        //   }
        //   return el;
        // });
        return updateData;
      });
    },
    onError(error: AxiosError<IAxiosErrorData, any>, variables, context) {
      return error;
    },
  });
};
export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const res = CommentService.likeToComment(commentId);
      //   toast.promise(res, {
      //     loading: "Loading",
      //     success: "Successfully",
      //     error: (err) => err?.response?.data.message,
      //   });
      const result = await res;
      return result;
    },
    onSuccess: (data, variables, context) => {
      //   AuthService.setTokensToCookie(data);
      //   push("/");
      queryClient.setQueriesData<IComment[]>([QUERY_KEY.comments], (oldData) => {
        if (!oldData) return [];
        const updateData = oldData.map((el) => {
          if (el.id === data.id) {
            return { ...el, likesCount: data.likesCount, likes: data.likes };
          }
          return el;
        });
        return updateData;
      });
    },
    onError(error: AxiosError<IAxiosErrorData, any>, variables, context) {
      return error;
    },
  });
};
export const useGetComments = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.comments, { postId }],
    queryFn: () => CommentService.getComments(postId),
    onError(err: AxiosError) {
      console.log("useGetProfilePosts", err);

      // if (err.response?.status === 401) {
      //   AuthService.logout();
      //   replace("/login");
      // }
      // console.log(err);
    },
    // retry: 0,
    // select: ({data}) => data,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};
