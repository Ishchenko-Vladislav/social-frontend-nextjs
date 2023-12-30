"use client";
import { axiosInstance } from "@/api/instance";
import { AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import useDebounce from "@/hooks/useDebounce";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { useSearch } from "@/hooks/useSearch";
import { useOwnProfile } from "@/hooks/user/useProfile";
import { IUser } from "@/services/user/user.interface";
import { API_URL } from "@/utils/constants";
import { cn } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { FC, useRef, useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { Recipient } from "./recipient/Recipient";

interface Props {
  searchTerms: string;
}

export const Recipients: FC<Props> = ({ searchTerms }) => {
  const debouncedValue = useDebounce(searchTerms, 500);
  const { data, isError, isLoading, isPending } = useSearch<IUser[]>({
    searchTerm: debouncedValue,
    only: "user",
  });
  const { data: ownProfile } = useOwnProfile();
  return (
    <div>
      {searchTerms.length > 0 ? (
        <div>
          {isPending ? (
            <div className="py-5 flex justify-center items-center gap-2">
              <ImSpinner6 className="animate-spin" />
              <span>Loading</span>
            </div>
          ) : (
            data?.map((user) => <Recipient key={user.id} {...user} />)
          )}
        </div>
      ) : (
        <div>{ownProfile ? <Recipient {...ownProfile} /> : null}</div>
      )}
    </div>
  );
};
