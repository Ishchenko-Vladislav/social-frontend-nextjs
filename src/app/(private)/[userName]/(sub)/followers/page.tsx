"use client";
import { UserSub } from "@/components/ui/user/UserSub";
import { useAuth } from "@/context/auth/Authorization";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
// import { useFollowers } from "@/hooks/user/useProfile";
import { IFollower } from "@/services/user/user.interface";
import { UserService } from "@/services/user/user.service";
import { QUERY_KEY } from "@/utils/constants";
import React, { FC } from "react";
import { ImSpinner6 } from "react-icons/im";

interface Props {
  params: { userName: string };
}

const Followers: FC<Props> = ({ params }) => {
  // const { data, isLoading } = useFollowers(params.userName);
  const { user } = useAuth();

  // if (isLoading) return null;
  // console.log("followers", data);
  const fetchProjects = async ({ pageParam }: any) => {
    const res = await UserService.getFollowers(params.userName, pageParam);
    return res;
  };
  const { data, isFetchingNextPage } = useInfinityLoad<IFollower>({
    fetchDataFn: fetchProjects,
    queryKey: [QUERY_KEY.followers],
  });
  return (
    <div>
      {data && data.pages && data.pages.length > 0 && data.pages[0].length ? (
        data.pages.map((page) => {
          return page.map((u) => (
            <UserSub
              isMe={u.fromUser.id === user.id}
              // imFollower={!!u.fromUser.followers[0] || false}
              key={u.id}
              {...u.fromUser}
              queryKey={QUERY_KEY.followers}
            />
          ));
        })
      ) : (
        <div className="text-center py-5 border-b border-border">
          <div className="text-xl">not followers</div>
          {/* <div className="text-sm text-muted-foreground">
            when you start following someone, their posts will be here.
          </div> */}
        </div>
      )}
      {isFetchingNextPage ? (
        <div className="py-5 flex justify-center items-center gap-2">
          <ImSpinner6 className="animate-spin" />
          <span>Loading</span>
        </div>
      ) : null}
    </div>
  );
};

export default Followers;
