import { axiosInstance } from "@/api/instance";
import { API_URL, USER_ROUTE } from "@/utils/constants";
import { IUser } from "./user.interface";

export const UserService = {
  async getOwnProfile() {
    const response = await axiosInstance.get<IUser>(API_URL + USER_ROUTE.getOwnProfile);
    return response.data;
  },
};
