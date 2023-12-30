"use client";
import { UserSub } from "@/components/ui/user/UserSub";
// import { useFollowings } from "@/hooks/user/useProfile";
import React, { FC } from "react";
import Cookie from "js-cookie";
import { useAuth } from "@/context/auth/Authorization";
import { UserService } from "@/services/user/user.service";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { IFollowing } from "@/services/user/user.interface";
import { QUERY_KEY } from "@/utils/constants";
import { ImSpinner6 } from "react-icons/im";
interface Props {
  params: { userName: string };
}

const Following: FC<Props> = ({ params }) => {
  // const { data, isLoading } = useFollowings(params.userName);
  const { user } = useAuth();
  // if (isLoading) return null;
  // console.log("followings", data);
  // const myUserName = Cookie.get("user_name");

  const fetchProjects = async ({ pageParam }: any) => {
    const res = await UserService.getFollowing(params.userName, pageParam);
    return res;
  };
  const { data, isFetchingNextPage } = useInfinityLoad<IFollowing>({
    fetchDataFn: fetchProjects,
    queryKey: [QUERY_KEY.followings],
  });

  return (
    <div>
      {data && data.pages && data.pages.length > 0 && data.pages[0].length ? (
        data.pages.map((page) => {
          return page.map((u) => (
            <UserSub
              key={u.id}
              isMe={u.toUser.id === user.id}
              // imFollower={!!u.toUser.followers[0] || false}
              {...u.toUser}
              queryKey={QUERY_KEY.followings}
            />
          ));
        })
      ) : (
        <div className="text-center py-5 border-b border-border">
          <div className="text-xl">not following</div>
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

export default Following;
