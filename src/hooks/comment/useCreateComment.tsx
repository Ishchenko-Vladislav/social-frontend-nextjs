import { ICommentDto, TCommentInfo } from "@/services/comment/comment.interface";
import { useEffect, useRef, useState } from "react";
import { usePreviewFile } from "../usePreviewFile";
import { useOwnProfile } from "../user/useProfile";
import { useSendComment } from "./useComment";
import { PickEmojiData } from "@/components/ui/pick-emoji/PickEmoji";

export const useCreateComment = (
  postId: string,
  queryKey: string = "",
  withModal: boolean = false
) => {
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [text, setText] = useState<string>("");
  const commentInfoRef = useRef<TCommentInfo>({
    hashtags: [],
    mentions: [],
  });

  const { attachments, acceptFiles, attachmentsPreview, countToRender, remove, uploadFile } =
    usePreviewFile();
  const {
    mutate: sendComment,
    variables,
    isPending,
    isError,
    isSuccess,
    error,
  } = useSendComment(queryKey, withModal);
  //   const emojiHandle = (e: any) => {
  //     setText((prev) => prev + e.native);
  //   };
  const handleSendComment = () => {
    const dataForFetchComment: {
      comment: ICommentDto;
      postId: string;
    } = {
      comment: {
        text: text,
        attachment: attachments,
        info: commentInfoRef.current,
        // attachment: attachments && attachments.length > 0 ? attachments : null,
      },
      postId,
    };
    sendComment(dataForFetchComment);
  };
  useEffect(() => {
    // console.log("HEE IS SUCCESS", error, variables, status);

    if (isSuccess) {
      remove("all");
      setText("");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!!text.length || !!attachments.length) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, [text, attachments]);

  const handleCommentInfo = (props: TCommentInfo) => {
    commentInfoRef.current = props;
    console.log(commentInfoRef);
  };
  const onEmojiClick = (emoji: PickEmojiData) => {
    setText((prev) => prev + emoji.native);
  };

  return {
    text,
    setText,
    handleCommentInfo,
    onEmojiClick,
    isDisabledButton,
    attachments,
    acceptFiles,
    attachmentsPreview,
    countToRender,
    remove,
    isSuccess,
    uploadFile,
    handleSendComment,
    isPending,
  };
};
