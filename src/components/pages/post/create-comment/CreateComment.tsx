"use client";
import { AvatarIcon, AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { useOwnProfile } from "@/hooks/user/useProfile";
import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from "react";
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
import { useUploadFile } from "@/hooks/useUploadFile";
import Image from "next/image";
interface Props {
  postId: string;
}
//<string | ArrayBuffer | null>
export const CreateComment: FC<Props> = ({ postId }) => {
  const [focused, setFocused] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [attachment, setAttachment] = useState<any>();
  const [text, setText] = useState("");
  const { data, progress, status, isErrorLoadingFile, isLoadingFile, reset, uploadFile } =
    useUploadFile();
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
  const fileHandle = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (!selectedFile) {
      console.log("selectedFile not found");
      return;
    }

    console.log("selectedFile", e.target.files, selectedFile);
    uploadFile(selectedFile);
    e.target.value = "";
  };
  useEffect(() => {
    console.log("fileHERE ------", data, progress);
  }, [data]);
  // const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = (e.target.files && e.target.files[0]) || null;
  //   if (!file) return console.log("file not found");
  //   const base64 = await convertBase64(file);
  //   console.log("base64", base64);
  //   setAttachment(base64);
  // };
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
            {/* {attachment
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
                    <video src="">
                      <source src={attachment}></source>
                    </video>
                  </div>
                )
              : null} */}
            {isLoadingFile ? (
              <div className="w-full rounded-xl bg-gray-400 aspect-video"></div>
            ) : null}
            {data ? (
              <div className="w-full rounded-xl overflow-hidden relative ">
                <div className="absolute top-1 right-1 z-10">
                  <Tooltip show={"remove"}>
                    <div
                      onClick={reset}
                      className="p-2 rounded-full  bg-black text-white cursor-pointer hover:bg-black/60 "
                    >
                      <AiOutlineClose />
                    </div>
                  </Tooltip>
                </div>
                {data.data.resource_type === "image" ? (
                  <Image
                    className="w-full object-contain"
                    src={data.data.secure_url}
                    height={data.data.height}
                    width={data.data.width}
                    alt="signature"
                  />
                ) : data.data.resource_type === "video" ? (
                  <video muted autoPlay loop className="h-full w-full max-h-96">
                    <source
                      className="w-full h-full"
                      // width={data.data.width}
                      // height={data.data.height}
                      src={data.data.url}
                    />
                  </video>
                ) : null}
              </div>
            ) : null}
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
                  onChange={fileHandle}
                  className="hidden peer"
                  type="file"
                  name="attachment"
                  id="attachment"
                  disabled={!!data || isLoadingFile}
                />

                <label
                  className="hover:bg-accent text-primary peer-disabled:text-primary/60 p-2 rounded-full transition-colors block cursor-pointer peer-disabled:cursor-default peer-disabled:hover:bg-transparent"
                  htmlFor="attachment"
                >
                  <PiImageBold className="" />
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
