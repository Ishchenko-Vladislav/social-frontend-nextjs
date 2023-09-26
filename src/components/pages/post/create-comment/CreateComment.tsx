"use client";
import { AvatarIcon, AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { useOwnProfile } from "@/hooks/user/useProfile";
import { FC, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
interface Props {}

export const CreateComment: FC<Props> = () => {
  const [focused, setFocused] = useState(false);
  const { data: d, isLoading } = useOwnProfile();

  return (
    <div className="py-2 border-b border-border">
      <div className="px-4 flex justify-between">
        <AvatarIconPrototype avatarPath={d?.avatarPath} />
        <div
          className={cn("flex flex-1 pl-3", {
            ["flex-col gap-0"]: focused,
            ["flex-row items-center gap-3"]: !focused,
          })}
        >
          <div className="flex-1 ">
            <TextareaAutosize
              placeholder="Post your reply"
              className="w-full resize-none p-1 outline-none"
            />
            {/* <input
              // onFocus={() => setFocused(true)}
              placeholder="Post your reply"
              type="text"
              className="flex-1 outline-none w-full p-1"
            /> */}
          </div>
          <div
            className={cn("flex", {
              ["justify-between "]: focused,
              [""]: !focused,
            })}
          >
            <button
              className={cn("", {
                ["block"]: focused,
                ["hidden"]: !focused,
              })}
            >
              <BsFillEmojiSmileFill />
            </button>
            <button
              onClick={() => setFocused((prev) => !prev)}
              className="bg-primary text-primary-foreground hover:bg-primary/60 transition-colors px-3 py-1.5 rounded-full"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* <div className="w-20 h-20 hidden">
        <Picker
          className=""
          showSkinTones={false}
          previewPosition="none"
          data={data}
          onEmojiSelect={console.log}
        />
      </div> */}
    </div>
  );
};
