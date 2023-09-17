import { axiosInstance } from "@/api/instance";
import { API_URL, POST_ROUTE } from "@/utils/constants";
import { IPost } from "./post.interface";

export const PostService = {
  async getFollowingPosts() {
    const response = await axiosInstance.get<IPost[]>(API_URL + POST_ROUTE.followingPosts);
    return response.data;
  },

  async likePost(id: string) {
    const response = await axiosInstance.put(API_URL + POST_ROUTE.like(id));
    return response.data;
  },

  async bookmark(postId: string) {
    const response = await axiosInstance.put(API_URL + POST_ROUTE.bookmark + postId);
    return response.data;
  },

  async getProfilePosts(userName: string) {
    const response = await axiosInstance.get<IPost[]>(
      API_URL + POST_ROUTE.profilePosts + "/" + userName
    );
    return response.data;
  },
  async getProfilePostsWithLikes(userName: string) {
    const response = await axiosInstance.get<IPost[]>(
      API_URL + POST_ROUTE.profilePostsWithLikes + "/" + userName
    );
    return response.data;
  },
};
