import { axiosInstance } from "@/api/instance";
import { API_URL, USER_ROUTE } from "@/utils/constants";
import { IFollowers, IFollowing, ISub, IUser } from "./user.interface";

export const UserService = {
  async getOwnProfile() {
    const response = await axiosInstance.get<IUser>(API_URL + USER_ROUTE.ownProfile);
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
  async getFollowers(userName: string) {
    const response = await axiosInstance.get<IFollowers>(API_URL + USER_ROUTE.followers + userName);
    return response.data;
  },
  async getFollowing(userName: string) {
    const response = await axiosInstance.get<IFollowing>(API_URL + USER_ROUTE.following + userName);
    return response.data;
  },
};
