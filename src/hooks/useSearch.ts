import { axiosInstance } from "@/api/instance";
import { IUser } from "@/services/user/user.interface";
import { API_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (searchTerm?: string) => {
  return useQuery({
    queryKey: ["search", { searchTerm }],
    queryFn: () => req(searchTerm),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    cacheTime: 1000 * 60,
    enabled: !!searchTerm,
  });
};

const req = async (searchTerm?: string) => {
  return (
    await axiosInstance.get<IUser[] | ITag[]>(API_URL + "/search", {
      params: {
        searchTerm,
      },
    })
  ).data;
};

export interface ITag {
  id: string;
  name: string;
  postcount: string | number;
}
