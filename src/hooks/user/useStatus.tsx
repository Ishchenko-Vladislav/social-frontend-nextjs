import { AuthService } from "@/services/auth/auth.service";
import { UserService } from "@/services/user/user.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

// export const useStatus = (userId: string) => {
//   return useQuery({
//     queryKey: ["status/subscription", { userId }],
//     queryFn: () => UserService.statusIsSubscription(userId),
//     onError(err: AxiosError) {
//       console.log("status/subscription", err);

//       // if (err.response?.status === 401) {
//       //   AuthService.logout();
//       //   replace("/login");
//       // }
//       // console.log(err);
//     },
//     retry: 0,
//     keepPreviousData: true,
//   });
// };
