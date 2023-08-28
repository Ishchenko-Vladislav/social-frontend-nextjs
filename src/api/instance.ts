import { AuthService } from "@/services/auth/auth.service";
import axios from "axios";
import cookie from "js-cookie";
import { redirect } from "next/navigation";
import Cookies from "next/headers";
import { TOKENS_ENUM } from "@/utils/constants";
export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = cookie.get(TOKENS_ENUM.REFRESH_TOKEN);
      console.log("HERE ::::", token);
      const tokens = await AuthService.refresh(token || "");
      AuthService.setTokensToCookie(tokens);
      if (tokens.access_token) {
        originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`;
        return axiosInstance(originalRequest);
      }
    }
    if (error.response && error.response.status === 401) AuthService.logout();
    return Promise.reject(error);
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
