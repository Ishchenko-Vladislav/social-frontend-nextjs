import { API_URL, AUTH_ROUTE, TOKENS_ENUM } from "@/utils/constants";
import axios from "axios";
import { IAuthData } from "./auth.helper";
import Cookie from "js-cookie";
import { axiosInstance } from "@/api/instance";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";

export interface ILoginFields {
  email: string;
  password: string;
}
export interface IRegisterFields {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
interface ITokens {
  access_token: string;
  refresh_token: string;
}
export const AuthService = {
  async login({ email, password }: ILoginFields) {
    const response = await axios.post<ITokens>(API_URL + AUTH_ROUTE.login, {
      email,
      password,
    });

    return response.data;
  },

  async register({ firstName, lastName, email, password }: IRegisterFields) {
    const response = await axios.post<ITokens>(API_URL + AUTH_ROUTE.register, {
      firstName,
      lastName,
      email,
      password,
    });

    return response.data;
  },

  async logout() {
    const { replace } = useRouter();
    // const response = await axios.post(API_URL + AUTH_ROUTE.logout);
    // return response.data;
    // this.removeAccessTokenFromCookie();
    Cookie.remove(TOKENS_ENUM.ACCESS_TOKEN);
    Cookie.remove(TOKENS_ENUM.REFRESH_TOKEN);
    replace("/login");
  },

  async refresh(token: string) {
    // console.log("cc >", token);
    const response = await axios.post<ITokens>(API_URL + AUTH_ROUTE.refresh, {
      refresh_token: token,
    });
    return response.data;
  },

  setTokensToCookie({ access_token, refresh_token }: ITokens) {
    // cookie.set(ACCESS_TOKEN_KEY, token, { expires: 7 });
    if (!access_token || !refresh_token) return;
    // cookies().set(TOKENS_ENUM.ACCESS_TOKEN, access_token);
    // cookies().set(TOKENS_ENUM.REFRESH_TOKEN, refresh_token);
    Cookie.set(TOKENS_ENUM.ACCESS_TOKEN, access_token);
    Cookie.set(TOKENS_ENUM.REFRESH_TOKEN, refresh_token);
  },
  // removeAccessTokenFromCookie() {
  //   cookie.remove(ACCESS_TOKEN_KEY);
  // },
};
