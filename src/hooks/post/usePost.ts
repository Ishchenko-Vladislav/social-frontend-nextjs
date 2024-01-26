import { PostService } from "@/services/post/post.service";
import { QUERY_KEY } from "@/utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IAxiosErrorData } from "../useAuth";
import { IPost, IPostDTO, IPostShort } from "@/services/post/post.interface";
import { IPagination } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import { TCommentInfo } from "@/services/comment/comment.interface";
import { usePreviewFile } from "../usePreviewFile";
import { useOwnProfile } from "../user/useProfile";
import { PickEmojiData } from "@/components/ui/pick-emoji/PickEmoji";

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [text, setText] = useState<string>("");
  const postInfoRef = useRef<TCommentInfo>({
    hashtags: [],
    mentions: [],
  });
  const { attachments, acceptFiles, attachmentsPreview, countToRender, remove, uploadFile } =
    usePreviewFile();
  const { data: d } = useOwnProfile();
  const {
    mutate: createPost,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (data: IPostDTO) => PostService.createPost(data),
    onSuccess: (newPost, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.following_posts] });
    },
    onError(error: AxiosError<IAxiosErrorData, any>, variables, context) {
      return error;
    },
  });
  // const { mutate: createPost, isPending, isError, isSuccess } = useCreatePost();
  // const emojiHandle = (e: any) => {
  //   setText(e.native);
  // };
  const handleCreatePost = () => {
    const data: IPostDTO = {
      attachment: attachments,
      info: postInfoRef.current,
      text: text,
    };
    console.log("HERE POST", data);
    createPost(data);
  };
  useEffect(() => {
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
  const handleClickEmoji = (emoji: PickEmojiData) => {
    setText((prev) => prev + emoji.native);
  };
  const handlePostInfo = (props: TCommentInfo) => {
    postInfoRef.current = props;
    // console.log(postInfoRef);
  };

  return {
    text,
    attachments,
    setText,
    handleClickEmoji,
    handleCreatePost,
    acceptFiles,
    attachmentsPreview,
    countToRender,
    isDisabledButton,
    uploadFile,
    handlePostInfo,
    remove,
    isPending,
    isSuccess,
  };
};

// export const useGetProfilePosts = (userName: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEY.profile_posts, { userName }],
//     queryFn: () => PostService.getProfilePosts(userName),

//     // onError(err: AxiosError) {
//     //   console.log("useGetProfilePosts", err);
//     // },
//     staleTime: 1000 * 60 * 5,

//     // cacheTime: 1000 * 60 * 5,
//     // keepPreviousData: true,
//   });
// };
// export const useGetProfilePostsWithLikes = (userName: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEY.profile_posts_with_likes, { userName }],
//     queryFn: () => PostService.getProfilePostsWithLikes(userName),
//   });
// };
export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.post_by_id, { postId }],
    queryFn: () => PostService.getPostById(postId),
  });
};
// export const useBookmarks = () => {
//   return useQuery({
//     queryKey: [QUERY_KEY.bookmarks],
//     queryFn: () => PostService.getBookmarks(),
//   });
// };
