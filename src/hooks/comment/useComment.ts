import { IComment, ICommentDto } from "@/services/comment/comment.interface";
import { CommentService } from "@/services/comment/comment.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IAxiosErrorData } from "../useAuth";
import { AxiosError } from "axios";
import { QUERY_KEY } from "@/utils/constants";
import { IPost } from "@/services/post/post.interface";
import { IPagination } from "@/utils/types";

export const useSendComment = (queryKey: string, withModal: boolean = false) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ comment, postId }: { comment: ICommentDto; postId: string }) => {
      const res = CommentService.sendComment(comment, postId);
      const result = await res;
      return result;
    },
    onSuccess: (newComment, variables, context) => {
      if (withModal) {
        queryClient.setQueryData([queryKey], (data: IPagination<IPost>) => {
          return {
            pages: data.pages.map((page) => {
              console.log("PAGES __ --", page, newComment);
              return page.map((post) => {
                if (post.id === newComment?.post?.id) {
                  console.log("NEW COMMENT __--", post, newComment);
                  return {
                    ...post,
                    commentsCount: post.commentsCount + 1,
                  };
                } else return post;
              });
            }),
            pageParams: data.pageParams,
          };
        });
      } else {
        queryClient.setQueryData([queryKey], (data: IPagination<IComment>) => {
          data.pages[0].unshift(newComment);
          return {
            pages: data.pages,
            pageParams: data.pageParams,
          };
        });
      }

      // queryClient.setQueryData<IComment[]>([QUERY_KEY.comments], (oldData) => {
      //   if (oldData) {
      //     const updateData = [data, ...oldData];
      //     return updateData;
      //   } else return oldData;
      // });
      // queryClient.setQueriesData<IComment[]>(
      //   [QUERY_KEY.comments, { postId: variables.postId }],
      //   (oldData) => {
      //     if (!oldData) return [];
      //     const updateData = [data, ...oldData];
      //     return updateData;
      //   }
      // );
      // queryClient.invalidateQueries([QUERY_KEY.post_by_id]);
      // update post by id for comments count
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.post_by_id] });
      // queryClient.setQueriesData<IPost>([QUERY_KEY.post_by_id], (oldData) => {
      //   if (!oldData) return oldData;
      //   ++oldData.commentsCount;
      //   return oldData;
      //   // if (!oldData) return [];
      //   // const updateData = [data, ...oldData];
      //   // return updateData;
      // });
    },
    onError(error: AxiosError<IAxiosErrorData, any>, variables, context) {
      return error;
    },
    mutationKey: [QUERY_KEY.comments],
  });
};
export const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId, indexPage }: { commentId: string; indexPage: number }) => {
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
      queryClient.setQueryData<IComment[]>([QUERY_KEY.comments], (oldData) => {
        console.log("HERE NEW DATA v2", oldData, variables, context);
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
// export const useGetComments = (postId: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEY.comments, { postId }],
//     queryFn: () => CommentService.getComments(postId),
//     onError(err: AxiosError) {
//       console.log("useGetProfilePosts", err);

//       // if (err.response?.status === 401) {
//       //   AuthService.logout();
//       //   replace("/login");
//       // }
//       // console.log(err);
//     },
//     // retry: 0,
//     // select: ({data}) => data,
//     staleTime: 1000 * 60 * 5,
//     cacheTime: 1000 * 60 * 5,
//     keepPreviousData: true,
//   });
// };
