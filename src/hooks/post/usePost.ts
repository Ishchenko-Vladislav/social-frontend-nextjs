import { PostService } from "@/services/post/post.service";
import { QUERY_KEY } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEY.following_posts],
    queryFn: () => PostService.getFollowingPosts(),
    onError(err: AxiosError) {
      console.log("useProfile", err);

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
export const useGetProfilePosts = (userName: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.profile_posts, { userName }],
    queryFn: () => PostService.getProfilePosts(userName),
    onError(err: AxiosError) {
      console.log("useProfile", err);

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
export const useGetProfilePostsWithLikes = (userName: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.profile_posts_with_likes, { userName }],
    queryFn: () => PostService.getProfilePostsWithLikes(userName),
    onError(err: AxiosError) {
      console.log("useProfile", err);

      // if (err.response?.status === 401) {
      //   AuthService.logout();
      //   replace("/login");
      // }
      // console.log(err);
    },
    // retry: 0,
    // select: ({data}) => data,

    keepPreviousData: true,
  });
};
export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.profile_posts_with_likes, { postId }],
    queryFn: () => PostService.getPostById(postId),
    onError(err: AxiosError) {
      console.log("useProfile", err);

      // if (err.response?.status === 401) {
      //   AuthService.logout();
      //   replace("/login");
      // }
      // console.log(err);
    },
    // retry: 0,
    // select: ({data}) => data,

    keepPreviousData: true,
  });
};
