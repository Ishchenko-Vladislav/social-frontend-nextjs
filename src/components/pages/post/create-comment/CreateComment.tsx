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
import { Skeleton } from "@/shadcn/ui/skeleton";
import { CloudinaryFile } from "@/services/file/file.interface";
import { usePreviewFile } from "@/hooks/usePreviewFile";
interface Props {
  postId: string;
}
//<string | ArrayBuffer | null>
export const CreateComment: FC<Props> = ({ postId }) => {
  const [focused, setFocused] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  // const [attachment, setAttachment] = useState<CloudinaryFile[]>([]);
  const [text, setText] = useState("");
  // const { attachments, progress, status, isErrorLoadingFile, isLoadingFile, remove, uploadFile } =
  //   useUploadFile();
  const { attachments, acceptFiles, attachmentsPreview, countToRender, remove, uploadFile } =
    usePreviewFile();
  const { data: d, isLoading } = useOwnProfile();
  const { mutate: sendComment } = useSendComment();
  const emojiHandle = (e: any) => {
    // console.log(e);
    setText((prev) => prev + e.native);
  };
  const handleSendComment = () => {
    const dataForFetchComment: {
      comment: ICommentDto;
      postId: string;
    } = {
      comment: {
        text: text,
        // attachment: attachments && attachments.length > 0 ? attachments : null,
      },
      postId,
    };
    sendComment(dataForFetchComment);
  };

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
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
              onFocus={() => setFocused(true)}
              placeholder="Post your reply"
              className="w-full resize-none p-1 outline-none"
            />
            <div
              className={cn("grid gap-1 sm:gap-3", {
                ["grid-cols-1"]: countToRender === 1,
                ["grid-cols-2 aspect-video  "]: countToRender >= 2,
                ["grid-rows-2"]: countToRender >= 3,
              })}
            >
              {attachments && !!attachments.length
                ? attachments.map((el, index) => (
                    <div
                      key={el.public_id}
                      className={cn("w-full", {
                        ["row-span-2"]: countToRender == 3 && index == 0,
                      })}
                    >
                      {el.resource_type === "image" ? (
                        <div
                          className={cn("relative w-fit", {
                            ["w-full h-full"]: countToRender >= 2,
                          })}
                        >
                          <div className="absolute top-1 right-1 z-10">
                            <Tooltip show={"remove"}>
                              <div
                                onClick={() => remove(el)}
                                className="p-2 rounded-full  bg-black text-white cursor-pointer hover:bg-black/60 "
                              >
                                <AiOutlineClose />
                              </div>
                            </Tooltip>
                          </div>
                          <Image
                            className={cn("max-w-full  h-auto rounded-2xl ", {
                              ["max-h-[500px] object-contain w-fit"]: countToRender == 1,
                              ["w-full h-full object-cover"]: countToRender >= 2,
                            })}
                            width={el.width ?? 2000}
                            height={el.height ?? 2000}
                            src={el.secure_url ?? el.url ?? ""}
                            alt="image"
                          />
                        </div>
                      ) : el.resource_type === "video" ? (
                        <video
                          controls
                          muted
                          autoPlay
                          loop
                          className="object-contain w-full aspect-square bg-black rounded-2xl h-full"
                        >
                          <source className="object-contain" src={el.url} />
                          <source className="object-contain" src={el.secure_url} />
                        </video>
                      ) : null}
                    </div>
                  ))
                : null}
              {attachmentsPreview.map((el, index) => (
                // <div className="w-10 h-10 bg-red-500"></div>
                <Skeleton
                  key={index}
                  className={cn("min-h-[20px] object-contain w-full bg-gray-400 rounded-md", {
                    ["h-[450px]"]: countToRender === 1,
                    ["h-full"]: countToRender > 1,
                  })}
                ></Skeleton>
              ))}
            </div>
            {/* {isLoadingFile ? (
              <Skeleton className="w-full rounded-xl bg-gray-400 aspect-video"></Skeleton>
            ) : null}
            {attachments && attachments.length > 0 ? (
              <div className="w-full rounded-xl overflow-hidden relative aspect-square">
                <div className="absolute top-1 right-1 z-10">
                  <Tooltip show={"remove"}>
                    <div
                      onClick={() => remove(attachments[0].public_id)}
                      className="p-2 rounded-full  bg-black text-white cursor-pointer hover:bg-black/60 "
                    >
                      <AiOutlineClose />
                    </div>
                  </Tooltip>
                </div>
                {attachments[0].resource_type === "image" ? (
                  <Image
                    className="w-full object-contain"
                    src={attachments[0].secure_url}
                    height={attachments[0].height}
                    width={attachments[0].width}
                    alt="signature"
                  />
                ) : attachments[0].resource_type === "video" ? (
                  <video
                    controls
                    muted
                    autoPlay
                    loop
                    className="object-contain w-full aspect-square bg-black rounded-2xl h-full"
                  >
                    <source className="object-contain" src={attachments[0].url} />
                    <source className="object-contain" src={attachments[0].secure_url} />
                  </video>
                ) : 
                null}
              </div>
            ) : null} */}
            {/* {isLoadingFile || attachments.length > 0 ? (
              <div className="p-4 rounded-xl bg-[#F5F3FF] mt-2">
                <div>{isLoadingFile ? <span>Uploading</span> : <span>Uploaded</span>}</div>
                <div>{progress}%</div>
                <div>
                  <p className="text-muted-foreground text-sm">
                    It will take a while to upload long videos. Make sure to keep your browser tab
                    open to avoid upload interruptions.
                  </p>
                </div>
              </div>
            ) : null} */}
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
                  onChange={uploadFile}
                  className="hidden peer"
                  type="file"
                  name="attachment"
                  id="attachment"
                  multiple
                  // accept="image/*, video/*"
                  accept={acceptFiles}
                  // disabled={!!attachments[0] || isLoadingFile}
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
