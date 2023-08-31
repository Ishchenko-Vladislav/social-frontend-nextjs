import { API_URL, AUTH_ROUTE, TOKENS_ENUM } from "@/utils/constants";
import axios from "axios";

import Cookie from "js-cookie";
import { axiosInstance } from "@/api/instance";
import { ILoginFields, IRegisterFields, IStatus, ITokens } from "./auth.interface";

export const AuthService = {
  async login(payload: ILoginFields) {
    const response = await axios.post<ITokens>(API_URL + AUTH_ROUTE.login, payload);

    return response.data;
  },

  async register(payload: IRegisterFields) {
    const response = await axios.post<ITokens>(API_URL + AUTH_ROUTE.register, payload);

    return response.data;
  },

  async logout() {
    // const { replace } = useRouter();
    // const response = await axios.post(API_URL + AUTH_ROUTE.logout);
    // return response.data;
    // this.removeAccessTokenFromCookie();
    Cookie.remove(TOKENS_ENUM.ACCESS_TOKEN);
    Cookie.remove(TOKENS_ENUM.REFRESH_TOKEN);
    // replace("/login");
    // redirect("/");
  },

  async refresh(token: string) {
    const response = await axios.post<ITokens>(API_URL + AUTH_ROUTE.refresh, {
      refresh_token: token,
    });
    return response.data;
  },

  setTokensToCookie({ access_token, refresh_token }: ITokens) {
    if (!access_token || !refresh_token) return;
    Cookie.set(TOKENS_ENUM.ACCESS_TOKEN, access_token, { expires: 0.1 });
    Cookie.set(TOKENS_ENUM.REFRESH_TOKEN, refresh_token, { expires: 7 });
  },

  async getStatus() {
    const response = await axiosInstance.get<IStatus>(API_URL + AUTH_ROUTE.status);
    return response.data;
  },
};
