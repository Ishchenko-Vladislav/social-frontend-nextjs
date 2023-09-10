import { axiosInstance } from "@/api/instance";
import { API_URL, USER_ROUTE } from "@/utils/constants";
import { IUser } from "./user.interface";

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
};
