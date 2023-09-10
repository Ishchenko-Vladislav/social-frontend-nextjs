import { axiosInstance } from "@/api/instance";
import { IUser } from "@/services/user/user.interface";
import { API_URL, USER_ROUTE } from "@/utils/constants";
import { Query, useQuery } from "@tanstack/react-query";

export const useSearch = (searchTerm?: string) => {
  return useQuery({
    queryKey: ["search", { searchTerm }],
    queryFn: () => req(searchTerm),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    // cacheTime: 1000 * 60
  });
};

const req = async (searchTerm?: string) => {
  const query = `?searchTerm=${searchTerm}`;
  console.log("searchTermsearchTermsearchTermsearchTerm", query);
  if (searchTerm) {
    return (
      await axiosInstance.get<IUser[] | ITag[]>(API_URL + "/search", {
        params: {
          searchTerm,
        },
      })
    ).data;
  }

  // return [] as IUser[] | ITag[];
};

export interface ITag {
  id: string;
  name: string;
  postcount: string | number;
}
