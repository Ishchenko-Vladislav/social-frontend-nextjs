import { axiosInstance } from "@/api/instance";
import { API_URL, USER_ROUTE } from "@/utils/constants";
import { ISub, IUser } from "./user.interface";

export const UserService = {
  async getOwnProfile() {
    const response = await axiosInstance.get<IUser>(API_URL + USER_ROUTE.ownProfile);
    return response.data;
  },
  async getProfile(userId?: string) {
    const url = API_URL + USER_ROUTE.profile;
    const uri = userId ? url + `/${userId}` : url;
    const response = await axiosInstance.get<IUser>(uri);
    return response.data;
  },

  async statusIsSubscription(userId: string) {
    const response = await axiosInstance.get<{ status: boolean }>(
      API_URL + USER_ROUTE.status + userId
    );
    return response.data;
  },
  async getFollowers(userName: string) {
    const response = await axiosInstance.get<ISub[]>(API_URL + USER_ROUTE.followers + userName);
    return response.data;
  },
  async getFollowing(userName: string) {
    const response = await axiosInstance.get<ISub[]>(API_URL + USER_ROUTE.following + userName);
    return response.data;
  },
};
