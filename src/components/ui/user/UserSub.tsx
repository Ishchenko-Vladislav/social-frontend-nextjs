"use client";
import { FC } from "react";
import { AvatarIcon } from "../avatar/Avatar";
import { IFollower, IFollowing, IUser } from "@/services/user/user.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "@/services/user/user.service";
import { IPagination } from "@/utils/types";

interface Props extends IUser {
  isMe?: boolean;
  queryKey: string;
  followers: any[];
}

export const UserSub: FC<Props> = ({ queryKey, isMe = false, ...user }) => {
  const queryClient = useQueryClient();
  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: (userId: string) => UserService.follow(userId),
    onSuccess: (updatedPost, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      // queryClient.setQueryData([queryKey], (data: IPagination<IFollower | IFollowing>) => {
      //   return {
      //     pages: data.pages.map((page) => {
      //       return page.map((post) => {
      //         if (post.id === updatedPost.id) return updatedPost;
      //         else return post;
      //       });
      //     }),
      //     pageParams: data.pageParams,
      //   };
      // });
    },
    onError(error, variables, context) {},
  });
  console.log("HERE USERSUB", user);
  return (
    <div className="flex gap-3 p-3 border-b border-border">
      <div>
        <AvatarIcon user={user} isFollowing={!!user.followers[0]} />
      </div>
      <div className="flex w-full flex-col ">
        <div className="flex w-full ">
          <div className="text-sm">
            <div>{user.displayName}</div>
            <div className="text-muted-foreground leading-3">@{user.userName}</div>
          </div>

          {isMe ? (
            <button className="ml-auto px-4 py-1.5 w-fit h-fit bg-foreground text-background hover:bg-foreground/80 transition-colors rounded-full">
              it's me
            </button>
          ) : !!user.followers[0] ? (
            <button
              onClick={() => subscribe(user.id)}
              className="ml-auto px-4 py-1.5 w-fit h-fit bg-foreground text-background hover:bg-foreground/80 transition-colors rounded-full"
            >
              unfollow
            </button>
          ) : (
            <button
              onClick={() => subscribe(user.id)}
              className="ml-auto px-4 py-1.5 w-fit h-fit bg-foreground text-background hover:bg-foreground/80 transition-colors rounded-full"
            >
              follow
            </button>
          )}
          {/* <button className="ml-auto px-4 py-1.5 w-fit h-fit bg-foreground text-background hover:bg-foreground/80 transition-colors rounded-full">
            {isMe ? "unfollow" : "follow"}
          </button> */}
        </div>
        <div>asdasdasd as das das da dsas a as das asd as das dad sda s</div>
      </div>
    </div>
  );
};
