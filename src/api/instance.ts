import { AuthService } from "@/services/auth/auth.service";
import axios from "axios";
import cookie from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import Cookies from "next/headers";
import { TOKENS_ENUM } from "@/utils/constants";
export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
});
// function redirectToLoginPage() {
//   const router = useRouter();
//   router.push("/login"); // Замените '/login' на путь к вашей странице входа
// }

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refresh_token = cookie.get(TOKENS_ENUM.REFRESH_TOKEN);
        if (!refresh_token) {
          AuthService.logout();
          return Promise.reject(error);
        }
        const tokens = await AuthService.refresh(refresh_token);

        AuthService.setTokensToCookie(tokens);
        originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        AuthService.logout();
        return Promise.reject(error);
      }
    }
    // if (error.response && error.response.status === 401) {
    //   console.log("errrrrrroooooorrr");
    //   AuthService.logout();
    // }
    return Promise.reject(error);

    // if (error.response && error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   const token = cookie.get(TOKENS_ENUM.REFRESH_TOKEN);
    //   console.log("HERE ::::", token);
    //   let tokens;
    //   try {
    //     tokens = await AuthService.refresh(token || "");
    //   } catch (error) {
    //     return AuthService.logout();
    //   }
    //   AuthService.setTokensToCookie(tokens);
    //   if (tokens.access_token) {
    //     originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`;
    //     return axiosInstance(originalRequest);
    //   }
    // }
    // if (error.response && error.response.status === 401) {
    //   console.log("need logout");
    //   AuthService.logout();
    // }

    // console.log("ddd");
    // return Promise.reject(error);
  }
);
axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = cookie.get(TOKENS_ENUM.ACCESS_TOKEN);
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// axios.defaults. = {
//   throttle: 0, // Отключить задержку
// };
