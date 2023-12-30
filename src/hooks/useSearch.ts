import { axiosInstance } from "@/api/instance";
import { IUser } from "@/services/user/user.interface";
import { API_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
interface ISearchProps {
  searchTerm?: string;
  only?: "user" | "tag";
}
export const useSearch = <T>({ searchTerm, only }: ISearchProps) => {
  return useQuery({
    queryKey: ["search", { searchTerm }],
    queryFn: () => req<T>(searchTerm, only),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!searchTerm,
  });
};

const req = async <T>(searchTerm?: string, only: "user" | "tag" | undefined = undefined) => {
  return (
    await axiosInstance.get<T>(API_URL + "/search", {
      params: {
        searchTerm,
        only,
      },
    })
  ).data;
};

export interface ITag {
  id: string;
  name: string;
  postcount: string | number;
}
