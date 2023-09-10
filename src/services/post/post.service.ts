import { axiosInstance } from "@/api/instance";
import { API_URL, POST_ROUTE } from "@/utils/constants";
import { IPost } from "./post.interface";

export const PostService = {
  async getFollowingPosts() {
    const response = await axiosInstance.get<IPost[]>(API_URL + POST_ROUTE.followingPosts);
    return response.data;
  },
};
