import { AuthService } from "@/services/auth/auth.service";
import { UserService } from "@/services/user/user.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { QUERY_KEY } from "@/utils/constants";
export const useOwnProfile = () => {
  // const { replace } = useRouter();
  return useQuery({
    queryKey: [QUERY_KEY.own_profile],
    queryFn: () => UserService.getOwnProfile(),
    onSuccess: (data) => {
      Cookie.set("user_name", data.userName);
      console.log("own profile was uploaded");
    },
    onError(err: AxiosError) {
      console.log("useProfile", err);

      // if (err.response?.status === 401) {
      //   AuthService.logout();
      //   replace("/login");
      // }
      // console.log(err);
    },
    // retry: 0,
    staleTime: 1000 * 60 * 60 * 24 * 365,
    cacheTime: 1000 * 60 * 60 * 24 * 365,
    keepPreviousData: true,
  });
};
export const useProfile = (userName: string) => {
  const { replace } = useRouter();
  return useQuery({
    queryKey: [QUERY_KEY.profile, { userName }],
    queryFn: () => UserService.getProfile(userName),
    onError(err: AxiosError) {
      console.log("useProfile", err);
    },
    // retry: 0,
    // keepPreviousData: true,
  });
};
export const useFollowers = (userName: string) => {
  // const { replace } = useRouter();
  return useQuery({
    queryKey: [QUERY_KEY.followers, { userName }],
    queryFn: () => UserService.getFollowers(userName),
    onError(err: AxiosError) {
      console.log("useProfile", err);
    },
    // retry: 0,
    // keepPreviousData: true,
  });
};
export const useFollowings = (userName: string) => {
  const { replace } = useRouter();
  return useQuery({
    queryKey: [QUERY_KEY.followings, { userName }],
    queryFn: () => UserService.getFollowing(userName),
    onError(err: AxiosError) {
      console.log("useProfile", err);
    },
    // retry: 0,
    // keepPreviousData: true,
  });
};
