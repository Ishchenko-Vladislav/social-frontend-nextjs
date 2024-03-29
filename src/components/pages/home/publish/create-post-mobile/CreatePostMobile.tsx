"use client";
import { FC, useEffect, useRef, useState } from "react";
import { RiQuillPenFill } from "react-icons/ri";
interface Props {}
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog";
import { BiArrowBack } from "react-icons/bi";
import { AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { useOwnProfile } from "@/hooks/user/useProfile";
import TextareaAutosize from "react-textarea-autosize";
import { FaRegFaceSmile } from "react-icons/fa6";
import { cn } from "@/utils/utils";
import { usePreviewFile } from "@/hooks/usePreviewFile";
import { PiImageBold } from "react-icons/pi";
import { PickEmoji, PickEmojiData } from "@/components/ui/pick-emoji/PickEmoji";
import { useCreatePost } from "@/hooks/post/usePost";
import { Skeleton } from "@/shadcn/ui/skeleton";
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { Highlight } from "../create-post/CreatePost";

export const CreatePostMobile: FC<Props> = () => {
  const { data: d } = useOwnProfile();
  const ref = useRef<HTMLButtonElement>(null);
  const {
    text,
    setText,
    attachments,
    uploadFile,
    isDisabledButton,
    handleCreatePost,
    handleClickEmoji,
    countToRender,
    attachmentsPreview,
    acceptFiles,
    handlePostInfo,
    remove,
    isPending,
    isSuccess,
  } = useCreatePost();
  useEffect(() => {
    if (isSuccess) {
      if (ref && ref.current) {
        ref.current.click();
      }
    }

    return () => {};
  }, [isSuccess]);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="fixed z-10 active:bg-primary/60 transition-colors text-2xl text-primary-foreground w-12 h-12 rounded-full bottom-20 right-5 bg-primary flex justify-center items-center">
            <RiQuillPenFill />
          </div>
        </DialogTrigger>
        <DialogContent
          withClose={false}
          className="w-full h-full border-none overflow-y-auto py-2 px-3 flex flex-col"
        >
          <DialogClose ref={ref} />
          <div className="flex items-center justify-between h-fit mb-3">
            <DialogClose
              aria-label="back"
              className="w-8 text-foreground h-8 transition-colors rounded-full hover:bg-accent flex justify-center items-center cursor-pointer"
              // onClick={() => back()}
            >
              <BiArrowBack />
            </DialogClose>
            <>
              <button
                disabled={isDisabledButton || isPending}
                onClick={handleCreatePost}
                className="px-3 py-1 disabled:bg-primary/70 rounded-full bg-primary text-primary-foreground text-sm active:bg-primary/70"
              >
                Post
              </button>
            </>
          </div>

          <div className="flex items-start h-fit gap-2 px-2 ">
            <AvatarIconPrototype avatarPath={d?.avatarPath} />
            <div className="relative">
              <TextareaAutosize
                onChange={(e) => setText(e.target.value)}
                value={text}
                // onFocus={() => setFocused(true)}
                placeholder="What is happening?"
                className="w-full resize-none p-1 outline-none break-all"
                maxLength={1000}
                minRows={3}
              />
              <div className="absolute top-0 left-0 p-1 pointer-events-none select-none z-10 break-all whitespace-pre-wrap">
                <Highlight handle={handlePostInfo} str={text} />
              </div>
            </div>
          </div>
          <div
            className={cn("grid gap-1 sm:gap-3 w-full", {
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
              <Skeleton
                key={index}
                className={cn("min-h-[20px] object-contain w-full bg-gray-400 rounded-md", {
                  ["h-[450px]"]: countToRender === 1,
                  ["h-full"]: countToRender > 1,
                })}
              ></Skeleton>
            ))}
          </div>
          <div className={cn("text-base flex items-center relative")}>
            <PickEmoji onEmojiClick={handleClickEmoji}>
              <button className="hover:bg-accent p-2 rounded-full transition-colors">
                <FaRegFaceSmile className="text-primary " />
              </button>
            </PickEmoji>

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
        </DialogContent>
      </Dialog>
    </div>
  );
};
