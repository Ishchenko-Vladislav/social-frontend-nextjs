import { axiosInstance } from "@/api/instance";
import { API_URL, USER_ROUTE } from "@/utils/constants";
import { IFollowing, IFollower, ISub, IUser } from "./user.interface";
import Cookie from "js-cookie";
export const UserService = {
  async getOwnProfile() {
    const response = await axiosInstance.get<IUser>(API_URL + USER_ROUTE.ownProfile);
    Cookie.set("user_name", response.data.userName);
    return response.data;
  },
  async getProfile(userName?: string) {
    const url = API_URL + USER_ROUTE.profile;
    const uri = userName ? url + `/${userName}` : url;
    const response = await axiosInstance.get<IUser>(uri);
    return response.data;
  },

  async statusIsSubscription(userId: string) {
    const response = await axiosInstance.get<{ status: boolean }>(
      API_URL + USER_ROUTE.status + userId
    );
    return response.data;
  },
  async getFollowers(userName: string, pageParam: string) {
    const response = await axiosInstance.get<IFollower[]>(
      API_URL + USER_ROUTE.followers + userName,
      {
        params: {
          pageParam,
        },
      }
    );
    return response.data;
  },
  async getFollowing(userName: string, pageParam: number) {
    const response = await axiosInstance.get<IFollowing[]>(
      API_URL + USER_ROUTE.following + userName,
      {
        params: {
          pageParam,
        },
      }
    );
    return response.data;
  },
  async follow(userId: string) {
    const response = await axiosInstance.post<{ isFollowing: boolean }>(
      API_URL + USER_ROUTE.follow + userId
    );
    return response.data;
  },
};
