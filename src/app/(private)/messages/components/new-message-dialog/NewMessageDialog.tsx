"use client";
import { FC, PropsWithChildren, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shadcn/ui/dialog";
import { IoSearch } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { useAuth } from "@/context/auth/Authorization";
import { UserService } from "@/services/user/user.service";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { IFollowing } from "@/services/user/user.interface";
import { QUERY_KEY } from "@/utils/constants";
import { UserSub } from "@/components/ui/user/UserSub";
import { cn } from "@/utils/utils";
import { AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { ImSpinner6 } from "react-icons/im";
import { Recipients } from "./recipients/Recipients";
import { useMutationState } from "@tanstack/react-query";
interface Props {}

export const NewMessageDialog: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { user } = useAuth();
  // if (isLoading) return null;
  // console.log("followings", data);
  // const myUserName = Cookie.get("user_name");
  const [searchTerms, setSearchTerms] = useState<string>("");
  const variables = useMutationState({
    filters: { mutationKey: ["new_conservation"], status: "pending" },
    select: (mutation) => mutation.state,
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="px-0 ">
        {variables.length > 0 ? (
          <div className="absolute inset-0 flex justify-center items-center bg-black/20">
            <div className="py-5 flex justify-center items-center gap-2 text-2xl">
              <ImSpinner6 className="animate-spin" />
              <span>Loading</span>
            </div>
          </div>
        ) : null}
        <DialogHeader className="px-4">
          <DialogTitle className="text-2xl font-semibold">New message</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription> */}
        </DialogHeader>
        <div className="px-4">
          <div className="w-full items-center flex gap-3">
            <IoSearch className="text-xl" />
            <input
              onChange={({ target }) => setSearchTerms(target.value)}
              value={searchTerms}
              className=" bg-transparent outline-none"
              placeholder="Search people"
              type="text"
            />
          </div>
        </div>
        <button className="w-full py-3 border-y flex text-foreground gap-4 items-center border-border px-4 hover:bg-accent transition-colors">
          <div className="w-12 h-12 rounded-full border border-border flex justify-center items-center">
            <MdGroups className="text-2xl" />
          </div>
          <span className="text-xl">Create group</span>
        </button>
        <Recipients searchTerms={searchTerms} />
        {/* <div>
          <div>
            {data && data.pages && data.pages.length > 0 && data.pages[0].length ? (
              data.pages.map((page) => {
                return page.map((u) => (
                  <button
                    key={u.id}
                    className={cn(
                      "flex gap-2 px-4 py-2 hover:bg-secondary max-w-full w-full transition-colors items-center",
                      
                    )}
                  >
                    <div>
                      <AvatarIconPrototype className="w-10 h-10" avatarPath={u.toUser.avatarPath} />
                    </div>
                    <div
                      className={cn("flex flex-col gap-2 overflow-hidden", {
                      })}
                    >
                      <div className="flex flex-col  items-start text-sm md:text-base">
                        <div>
                          <span className="font-bold ">{u.toUser.displayName}</span>
                        </div>
                        <div className="overflow-hidden truncate">
                          <span className="text-muted-foreground">@{u.toUser.userName}</span>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </button>
                ));
              })
            ) : (
              <div className="text-center py-5 border-b border-border">
                <div className="text-xl">not following</div>
               
              </div>
            )}
            {isFetchingNextPage ? (
              <div className="py-5 flex justify-center items-center gap-2">
                <ImSpinner6 className="animate-spin" />
                <span>Loading</span>
              </div>
            ) : null}
          </div>
          <div ref={refetchRef}></div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};
