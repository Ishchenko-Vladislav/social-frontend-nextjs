import { cn } from "@/utils/utils";
import { FC } from "react";
// import { LuMailPlus } from "react-icons";
import { TbMailPlus } from "react-icons/tb";
import { IoSearch } from "react-icons/io5";
import { Conversation } from "./convarsation/Conversation";
import { NewMessageDialog } from "../new-message-dialog/NewMessageDialog";
interface Props {
  isCollapsed: boolean;
}

export const UsersContainer: FC<Props> = ({ isCollapsed }) => {
  return (
    <div className="w-full flex flex-col py-3 gap-4 h-full">
      <div
        className={cn("px-2 flex items-center justify-between text-xl", {
          ["px-0"]: isCollapsed,
        })}
      >
        <div
          className={cn("", {
            ["hidden"]: isCollapsed,
          })}
        >
          <span className="font-semibold">Messages</span>
        </div>
        <NewMessageDialog>
          <button
            className={cn(
              "w-10 h-10 hover:bg-secondary rounded-full flex items-center justify-center shrink-0",
              {
                ["mx-auto"]: isCollapsed,
              }
            )}
          >
            {/* <LuMailPlus  /> */}
            <TbMailPlus className="" />
          </button>
        </NewMessageDialog>
      </div>
      <div
        className={cn("px-2", {
          ["opacity-0 pointer-events-none select-none"]: isCollapsed,
        })}
      >
        <div className="relative ">
          <input
            className="w-full py-2 rounded-full border border-border pl-10 pr-2 truncate "
            placeholder={"Search Direct Messages"}
            type="text"
          />
          <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <Conversation isCollapsed={isCollapsed} />
    </div>
  );
};
