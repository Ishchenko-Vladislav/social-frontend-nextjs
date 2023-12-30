import { axiosInstance } from "@/api/instance";
import { API_URL, POST_ROUTE, USER_ROUTE } from "@/utils/constants";
import { IBookmarks, IPost, IPostShort, IPostDTO } from "./post.interface";

export const PostService = {
  async getFollowingPosts(pageParam: number) {
    const response = await axiosInstance.get<IPostShort[]>(API_URL + POST_ROUTE.followingPosts, {
      params: {
        pageParam,
      },
    });
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

  async getProfilePosts(userName: string, pageParam: number) {
    const response = await axiosInstance.get<IPostShort[]>(
      API_URL + POST_ROUTE.profilePosts + "/" + userName,
      {
        params: {
          pageParam,
        },
      }
    );
    return response.data;
  },
  async getProfilePostsWithLikes(userName: string, pageParam: number) {
    const response = await axiosInstance.get<IPostShort[]>(
      API_URL + POST_ROUTE.profilePostsWithLikes + "/" + userName,
      {
        params: {
          pageParam,
        },
      }
    );
    return response.data;
  },
  async getPostById(postId: string) {
    const response = await axiosInstance.get<IPost>(API_URL + POST_ROUTE.postById + postId);
    return response.data;
  },
  async getBookmarks(pageParam: number) {
    const response = await axiosInstance.get<IBookmarks[]>(API_URL + POST_ROUTE.bookmarks, {
      params: {
        pageParam,
      },
    });
    return response.data;
  },
  async createPost(data: IPostDTO) {
    const response = await axiosInstance.post<IPost>(API_URL + POST_ROUTE.createPost, data);
    return response.data;
  },

  // async addComment() {
  //   const response = await axiosInstance.get<IBookmarks[]>(API_URL + POST_ROUTE.bookmarks);
  //   return response.data;
  // },
};
