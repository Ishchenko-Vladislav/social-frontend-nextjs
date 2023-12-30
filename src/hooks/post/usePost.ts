import { PostService } from "@/services/post/post.service";
import { QUERY_KEY } from "@/utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IAxiosErrorData } from "../useAuth";
import { IPost, IPostDTO, IPostShort } from "@/services/post/post.interface";
import { IPagination } from "@/utils/types";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IPostDTO) => PostService.createPost(data),
    onSuccess: (newPost, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.following_posts] });
    },
    onError(error: AxiosError<IAxiosErrorData, any>, variables, context) {
      return error;
    },
  });
};

export const useGetProfilePosts = (userName: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.profile_posts, { userName }],
    queryFn: () => PostService.getProfilePosts(userName),

    // onError(err: AxiosError) {
    //   console.log("useGetProfilePosts", err);
    // },
    staleTime: 1000 * 60 * 5,

    // cacheTime: 1000 * 60 * 5,
    // keepPreviousData: true,
  });
};
export const useGetProfilePostsWithLikes = (userName: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.profile_posts_with_likes, { userName }],
    queryFn: () => PostService.getProfilePostsWithLikes(userName),
  });
};
export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.post_by_id, { postId }],
    queryFn: () => PostService.getPostById(postId),
  });
};
export const useBookmarks = () => {
  return useQuery({
    queryKey: [QUERY_KEY.bookmarks],
    queryFn: () => PostService.getBookmarks(),
  });
};
