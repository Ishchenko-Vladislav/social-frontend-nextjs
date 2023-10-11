"use client";
import { AvatarIcon, AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { useOwnProfile } from "@/hooks/user/useProfile";
import { ChangeEvent, FC, useEffect, useState } from "react";
import Picker from "@emoji-mart/react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
import { PiImageBold } from "react-icons/pi";
import { FaRegFaceSmile } from "react-icons/fa6";
import { useWindowSize } from "@/hooks/useWindowSize";
import { EmojiPicker } from "./emoji-picker/EmojiPicker";
import { useSendComment } from "@/hooks/comment/useComment";
import { convertBase64 } from "@/utils/utils";
import { AiOutlineClose } from "react-icons/ai";
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import { ICommentDto } from "@/services/comment/comment.interface";
interface Props {
  postId: string;
}

export const CreateComment: FC<Props> = ({ postId }) => {
  const [focused, setFocused] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [attachment, setAttachment] = useState<string | ArrayBuffer | null>("");
  const [text, setText] = useState("");
  const { data: d, isLoading } = useOwnProfile();
  const { mutate: sendComment } = useSendComment();
  const emojiHandle = (e: any) => {
    console.log(e);
    setText((prev) => prev + e.native);
  };
  const handleSendComment = () => {
    const dataForFetchComment: {
      comment: ICommentDto;
      postId: string;
    } = {
      comment: { text: text, attachment: attachment },
      postId,
    };
    sendComment(dataForFetchComment);
  };
  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files && e.target.files[0]) || null;
    if (!file) return console.log("file not found");
    const base64 = await convertBase64(file);
    setAttachment(base64);
  };
  useEffect(() => {
    if (!attachment && text.length === 0) {
      setIsDisabledButton(true);
    } else {
      setIsDisabledButton(false);
    }

    return () => {};
  }, [attachment, text]);

  return (
    <div className="py-2 border-b border-border">
      <div className="px-3 sm:px-4 flex justify-between">
        <AvatarIconPrototype avatarPath={d?.avatarPath} />
        <div
          className={cn("flex flex-1 pl-3 ", {
            ["flex-col gap-0"]: focused,
            ["flex-row items-center gap-3"]: !focused,
          })}
        >
          <div className="flex-1 flex-col">
            <TextareaAutosize
              onChange={(e) => setText(e.target.value)}
              value={text}
              onFocus={() => setFocused(true)}
              placeholder="Post your reply"
              className="w-full resize-none p-1 outline-none"
            />
            {attachment
              ? typeof attachment == "string" && (
                  <div className="w-full h-fit rounded-2xl overflow-hidden relative">
                    <div className="absolute top-1 right-1">
                      <Tooltip show={"remove"}>
                        <div
                          onClick={() => setAttachment("")}
                          className="p-2 rounded-full  bg-black text-white cursor-pointer hover:bg-black/60 "
                        >
                          <AiOutlineClose />
                        </div>
                      </Tooltip>
                    </div>
                    <img className="object-contain" src={attachment} alt="attachment" />
                  </div>
                )
              : null}
            {/* <input
              // onFocus={() => setFocused(true)}
              placeholder="Post your reply"
              type="text"
              className="flex-1 outline-none w-full p-1"
            /> */}
          </div>
          <div
            className={cn("flex ", {
              ["justify-between mt-4"]: focused,
              [""]: !focused,
            })}
          >
            <div
              className={cn("text-base flex items-center ", {
                ["block"]: focused,
                ["hidden"]: !focused,
              })}
            >
              <div className="relative ">
                <button
                  onClick={() => setShowEmoji((prev) => !prev)}
                  className="hover:bg-accent p-2 rounded-full transition-colors"
                >
                  <FaRegFaceSmile className="text-primary " />
                </button>
                {showEmoji ? (
                  <EmojiPicker close={() => setShowEmoji(false)} selectedEmoji={emojiHandle} />
                ) : null}
              </div>
              <div>
                <input
                  onChange={(e) => uploadFile(e)}
                  className="hidden"
                  type="file"
                  name="attachment"
                  id="attachment"
                />
                <label
                  className="hover:bg-accent p-2 rounded-full transition-colors block cursor-pointer"
                  htmlFor="attachment"
                >
                  <PiImageBold className="text-primary" />
                </label>
              </div>
            </div>

            <button
              onClick={handleSendComment}
              // onClick={() => setFocused((prev) => !prev)}
              disabled={isDisabledButton}
              className="bg-primary text-primary-foreground hover:bg-primary/60 transition-colors px-3 py-1.5 rounded-full disabled:bg-primary/60 "
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
