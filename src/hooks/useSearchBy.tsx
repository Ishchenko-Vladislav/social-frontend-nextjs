import { axiosInstance } from "@/api/instance";
import { IPostShort } from "@/services/post/post.interface";
import { IUser } from "@/services/user/user.interface";
import { API_URL } from "@/utils/constants";
import { useEffect, useState } from "react";

export const useSearchBy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<IPostShort[] | IUser[]>([]);
  const get = async (skip: number = 0) => {
    const res = await axiosInstance.get(API_URL + "/search-by", {
      params: {
        searchTerm: searchTerm,
        only: false,
        skip,
      },
    });
    return res;
  };

  useEffect(() => {
    get(0).then((res) => {
      console.log("NEW REQUEST", res.data);
      return setData(res.data);
    });

    return () => {};
  }, [searchTerm]);
  return {
    data,
    searchTerm,
    setSearchTerm,
  };
};
