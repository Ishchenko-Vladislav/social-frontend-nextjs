import { PostService } from "@/services/post/post.service";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["following/posts"],
    queryFn: () => PostService.getFollowingPosts(),
    onError(err: AxiosError) {
      console.log("useProfile", err);

      // if (err.response?.status === 401) {
      //   AuthService.logout();
      //   replace("/login");
      // }
      // console.log(err);
    },
    // retry: 0,
    keepPreviousData: true,
  });
};
