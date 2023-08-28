import { AuthService } from "@/services/auth/auth.service";
import { UserService } from "@/services/user/user.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => UserService.getOwnProfile(),
    onError(err: AxiosError) {
      // if (err.response?.status === 401) {
      //   AuthService.logout();
      // }
      // console.log(err);
    },
  });
};
