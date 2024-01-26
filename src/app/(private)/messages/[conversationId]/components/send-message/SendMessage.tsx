"use client";
import { EmojiPicker } from "@/components/pages/post/create-comment/emoji-picker/EmojiPicker";
import { PickEmoji, PickEmojiData } from "@/components/ui/pick-emoji/PickEmoji";
import { useConversation } from "@/context/ConversationContext";
import { usePreviewFile } from "@/hooks/usePreviewFile";
import { IMessageDTO } from "@/services/conversation/conversation.interface";
// import { ICommentDTO } from "@/services/conversation/conversation.interface";
import { ConversationService } from "@/services/conversation/conversation.service";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FC, FormEvent, useEffect, useState } from "react";
import { FaRegFaceSmile } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { PiImageBold } from "react-icons/pi";
import ReactTextAreaAutoSize from "react-textarea-autosize";
import { LuLoader2 } from "react-icons/lu";
interface Props {}

export const SendMessage: FC<Props> = () => {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const { addMessages } = useConversation();
  const [text, setText] = useState<string>("");
  const { attachments, acceptFiles, attachmentsPreview, countToRender, remove, uploadFile } =
    usePreviewFile();
  const onEmojiClick = (emoji: PickEmojiData) => {
    setText((prev) => prev + emoji.native);
  };

  // const send = async (message: IMessageDTO) => {
  //   const promise = ConversationService.sendMessage(params.conversationId as string, message);
  //   addMessages({
  //     status: "pending",
  //     msg: {
  //       content: message.content,
  //     },
  //     promise,
  //     withAnimation: true,
  //   });
  // };

  const { mutate: send, isPending } = useMutation({
    mutationFn: (message: IMessageDTO) =>
      ConversationService.sendMessage(params.conversationId as string, message),
    onSuccess: (message, variables, context) => {
      // console.log("HERE NEW message", message);
      setText("");
    },
    onError(error, variables, context) {
      // setLiked((prev) => !prev);
      // setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    },
    mutationKey: ["new-message"],
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = () => {
    const message: IMessageDTO = {
      content: text,
    };
    send(message);
    // console.log("sendMessage");
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Предотвратить перенос строки (если необходимо)
      sendMessage();
    }
  };
  useEffect(() => {
    setMounted(true);

    return () => {};
  }, []);

  return (
    <div className="py-2 px-2 w-full border-t border-border">
      <form
        onSubmit={submit}
        className="relative border border-border flex items-center justify-between px-2 rounded-xl gap-1 xs:gap-3 h-min"
      >
        <div className=" flex xs:gap-1">
          <PickEmoji onEmojiClick={onEmojiClick}>
            <button
              //   onClick={() => setShowEmoji((prev) => !prev)}
              className="hover:bg-accent w-10 h-10 flex justify-center items-center rounded-full transition-colors"
            >
              <FaRegFaceSmile className="text-primary " />
            </button>
          </PickEmoji>
          {/* <div className="relative w-8 h-8 rounded-full hover:bg-secondary transition-colors">
            <button
              onClick={() => setShowEmoji((prev) => !prev)}
              className="hover:bg-accent p-2 rounded-full transition-colors"
            >
              <FaRegFaceSmile className="text-primary " />
            </button>
            {showEmoji ? (
              <EmojiPicker
                className="bottom-0"
                close={() => setShowEmoji(false)}
                selectedEmoji={emojiHandle}
              />
            ) : null}
          </div> */}
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
              className="hover:bg-accent text-primary peer-disabled:text-primary/60 p-2 rounded-full transition-colors w-10 h-10 flex justify-center items-center cursor-pointer peer-disabled:cursor-default peer-disabled:hover:bg-transparent"
              htmlFor="attachment"
            >
              <PiImageBold className="" />
            </label>
          </div>
        </div>
        {mounted ? (
          <ReactTextAreaAutoSize
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxRows={6}
            rows={1}
            // defaultValue={""}
            onKeyDown={handleKeyPress}
            minRows={1}
            placeholder="Start a new message"
            className="rounded-xl resize-none no-scrollbar border-none flex-1 p-2 bg-transparent focus-visible:ring-0 ring-0 !focus-visible:shadow-none focus-visible:outline-none"
          />
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-10 h-10 transition-colors rounded-full hover:bg-secondary flex justify-center items-center"
        >
          {isPending ? <LuLoader2 className="animate-spin" /> : <IoSend className="text-primary" />}
        </button>
      </form>
    </div>
  );
};
