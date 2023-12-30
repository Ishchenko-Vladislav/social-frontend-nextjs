"use client";
import { AvatarIcon, AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
import { useOwnProfile } from "@/hooks/user/useProfile";
import {
  CSSProperties,
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  FC,
  ForwardedRef,
  MutableRefObject,
  Ref,
  RefObject,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
import { PiImageBold } from "react-icons/pi";
import { FaRegFaceSmile } from "react-icons/fa6";
import { EmojiPicker } from "./emoji-picker/EmojiPicker";
import { useSendComment } from "@/hooks/comment/useComment";
import { AiOutlineClose } from "react-icons/ai";
import { Tooltip } from "@/components/ui/tooltip/Tooltip";
import { ICommentDto, TCommentInfo } from "@/services/comment/comment.interface";
import Image from "next/image";
import { Skeleton } from "@/shadcn/ui/skeleton";
import { usePreviewFile } from "@/hooks/usePreviewFile";
import { Spinner } from "@/components/ui/spinner/Spinner";
interface Props {
  postId: string;
}

//<string | ArrayBuffer | null>
export const CreateComment: FC<Props> = ({ postId }) => {
  const [focused, setFocused] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const [text, setText] = useState<string>("");
  const commentInfoRef = useRef<TCommentInfo>({
    hashtags: [],
    mentions: [],
  });

  const { attachments, acceptFiles, attachmentsPreview, countToRender, remove, uploadFile } =
    usePreviewFile();
  const { data: d } = useOwnProfile();
  const { mutate: sendComment, variables, isPending, isError, isSuccess, error } = useSendComment();
  const emojiHandle = (e: any) => {
    setText((prev) => prev + e.native);
  };
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
            <div className="relative font-light selection:z-20 selection:bg-blue-500">
              <TextareaAutosize
                onChange={(e) => setText(e.target.value)}
                value={text}
                onFocus={() => setFocused(true)}
                placeholder="Post your reply"
                className="w-full resize-none p-1 outline-none break-all bg-background rounded"
                maxLength={1000}
              />
              <div className="absolute top-0 left-0 p-1 pointer-events-none select-none z-10 break-all whitespace-pre-wrap">
                <Highlight handle={handleCommentInfo} str={text} />
              </div>
            </div>
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
                <Skeleton
                  key={index}
                  className={cn("min-h-[20px] object-contain w-full bg-gray-400 rounded-md", {
                    ["h-[450px]"]: countToRender === 1,
                    ["h-full"]: countToRender > 1,
                  })}
                ></Skeleton>
              ))}
            </div>
          </div>
          <div
            className={cn("flex ", {
              ["justify-between mt-3"]: focused,
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
            <div className="flex items-center gap-2">
              <div
                className={cn("text-xs text-muted-foreground ", {
                  ["block"]: focused,
                  ["hidden"]: !focused,
                })}
              >
                {/* <span>{text.length}</span>
                <span>/1000</span> */}
                <div
                  style={{ "--dd": "hsl(var(--primary))" } as CSSProperties}
                  className="w-7 h-7 bg-muted rounded-full "
                >
                  <div
                    style={{
                      background: `conic-gradient(hsl(var(--primary)) ${
                        (text.length / 1000) * 100
                      }%, transparent ${(text.length / 1000) * 100}%)`,
                    }}
                    className="w-full h-full rounded-full flex justify-center items-center"
                  >
                    <div className="w-5 h-5 rounded-full bg-background"></div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleSendComment}
                // onClick={() => setFocused((prev) => !prev)}
                disabled={isDisabledButton || isPending}
                className="bg-primary text-primary-foreground font-semibold hover:bg-primary/60 transition-colors px-3 py-1.5 rounded-full disabled:bg-primary/60 "
              >
                {isPending ? (
                  <Spinner className="w-6 h-6 border-t-primary-foreground" />
                ) : (
                  <span>Reply</span>
                )}
              </button>
            </div>
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

// function parseTextWithMentions(text: string) {
//   // const mentionRegex = /(?:^|[\s\n])@([\w]+)/g;
//   const mentionRegex = /@[\w]+/g;

//   const tokens = [];
//   let lastIndex = 0;

//   text.replace(mentionRegex, (match, username, index, d) => {
//     console.log("props", match, username, index, d);
//     // // Добавляем текст до упоминания
//     // console.log("in replace", match);
//     // if (lastIndex !== index) {
//     //   tokens.push(text.slice(lastIndex, index));
//     // }

//     // // Добавляем упоминание как токен
//     // tokens.push(<span className="text-primary">{match}</span>);

//     // // Обновляем lastIndex для следующей итерации
//     // lastIndex = index + match.length;
//     return match;
//   });

//   // Добавляем остаток текста после последнего упоминания
//   if (lastIndex < text.length) {
//     tokens.push(text.slice(lastIndex));
//   }

//   return text;
// }

const parser = (str: string, handle?: (i: TCommentInfo) => void) => {
  const tokens: string[] = [];
  const mentions: string[] = [];
  const hashtags: string[] = [];
  let currentIndex = 0;
  let nextLine = false;
  str.split("").map((el) => {
    if (el === " " || el === "\n") nextLine = true;
    if (nextLine && !/[\s\n]/.test(el)) {
      currentIndex++;
      nextLine = false;
    }
    if (tokens[currentIndex]) tokens[currentIndex] += el;
    else tokens[currentIndex] = "" + el;
  });
  const t = tokens.map((el) => {
    if (
      el.includes("@") &&
      !el.includes("#") &&
      el.indexOf("@") === el.lastIndexOf("@") &&
      el.startsWith("@") &&
      el.replace(/[ \n]/g, "").length > 1
    ) {
      mentions.push(el.replace(/[ \n]/g, ""));
      return <span className="text-primary">{el}</span>;
    } else if (
      el.includes("#") &&
      !el.includes("@") &&
      el.indexOf("#") === el.lastIndexOf("#") &&
      el.startsWith("#") &&
      el.replace(/[ \n]/g, "").length > 1
    ) {
      hashtags.push(el.replace(/[ \n]/g, ""));
      return <span className="text-primary">{el}</span>;
    } else {
      return el;
    }
  });
  if (handle) {
    handle({
      hashtags,
      mentions,
    });
  }
  // console.log("parser tokens", tokens);
  return t;
};
type THighlightProps = {
  str: string;
  handle?: (i: TCommentInfo) => void;
  // ref?: any;
};
export const Highlight: FC<THighlightProps> = ({ str, handle }) => {
  // const mentionRegex = /@[\w]+/g;
  // const mentionRegex2 = /@[\w]+/g;
  // const hashtagRegex = /#[\w]+/g;
  // const mentionRegex3 = /(?:\s|\n)(@[\w]+)/g;
  // const mentionRegex4 = /[ \n](@[\w]+)/g;
  // // const hashtagRegex = /(?:\s|\n)(#[\w]+)/g;
  // // const mentionRegex = /(?:^|\s|\n)(@[\w]+)/g;
  // // const hashtagRegex = /(?:^|\s|\n)(#[\w]+)/g;
  // const mentions: string[] = [];
  // const hashtags: string[] = [];
  // const matchMentionValue = str.match(mentionRegex2);
  const t = parser(str, handle);
  return t;
  // let currentValue = ''

  // const a = str.split("").map((el, index, arr) => {
  //   // let min = 0
  //   // let max = 0
  //   if(el === '@' && currentValue.length === 0) {
  //     currentValue += '@'

  //     // min = index
  //   } else {
  //     currentValue = ''
  //   }

  // })
  // const tokens = parseTextWithMentions(str);
  // console.log("tokens", tokens);
  // return tokens;

  //@ts-ignore
  // console.log("ccccccc", matchMentionValue, str.split(mentionRegex2));

  // const matchHashtagValue = str.match(hashtagRegex);
  // const val = []
  // if (matchMentionValue) {
  //   return str.split(mentionRegex2).map((el, index, arr) => {
  //     console.log("ss", el, index, el.endsWith("\n"), el.endsWith(" "), arr);
  //     if (
  //       index <
  //       arr.length - 1
  //       // (el.endsWith("\n") || el.endsWith(" ") || (el.length === 0 && index === 0))
  //     ) {
  //       // if(matchMentionValue)
  //       const c = matchMentionValue.shift();
  //       if (!c) return el;
  //       return (
  //         <>
  //           {el}
  //           <span className="text-primary">{c}</span>
  //         </>
  //       );
  //     } else {
  //       return el;
  //     }
  //   });
  // .flatMap((part) => {
  //   if (typeof part === "string") {
  //     const matchHashtagValue = part.match(hashtagRegex);
  //     if (matchHashtagValue) {
  //       return part.split(hashtagRegex).map((el, index, arr) => {
  //         if (index < arr.length - 1) {
  //           const c = matchHashtagValue.shift();
  //           return (
  //             <>
  //               <span className="text-primary">{c}</span>
  //             </>
  //           );
  //         }
  //         return el;
  //       });
  //     } else {
  //       return part;
  //     }
  //   } else {
  //     return part;
  //   }
  // });

  // return <div className="whitespace-pre-wrap">{ar}</div>;

  // const ar = str
  //   .split(" ")
  //   // .flatMap((part) => part.split("\n"))
  //   .map((el, index, arr) => {
  //     console.log("el here", el);
  //     el = index === 0 ? el : " " + el;
  //     // const elChecked = el.trim();
  //     if (el.match(mentionRegex)) {
  //       // if (el.startsWith("@")) {
  //       // mentions.push(el.trim());
  //       // el.replaceAll(mentionRegex, <span className="text-primary">{el}</span>)
  //       return <span className="text-primary">{el}</span>;
  //     } else if (el.match(hashtagRegex)) {
  //       // } else if (el.startsWith("#")) {
  //       // hashtags.push(el.trim());
  //       return <span className="text-primary">{el}</span>;
  //     }
  //     return el;
  //   });
  // if (handle) handle({ hashtags, mentions });
  // return <div className="whitespace-pre-wrap">{ar}</div>;

  // const matches = [...str.matchAll(mentionRegex), ...str.matchAll(hashtagRegex)];

  // if (matches.length === 0) {
  //   return <div>{str} </div>;
  // }

  // let lastIndex = 0;
  // const parts = [];

  // matches.forEach((match, index) => {
  //   const [matchText] = match;
  //   const matchIndex = match.index ?? 0;

  //   // Add the text before the match
  //   const beforeText = str.substring(lastIndex, matchIndex);
  //   if (beforeText) {
  //     parts.push(beforeText);
  //   }

  //   // Add the highlighted match
  //   const matchType = matchText.startsWith("@") ? "mention" : "hashtag";
  //   parts.push(
  //     <span key={index} className={matchType === "mention" ? "text-red-500" : "text-blue-500"}>
  //       {matchText}
  //     </span>
  //   );

  //   lastIndex = matchIndex + matchText.length;
  // });

  // // Add any remaining text after the last match
  // const remainingText = str.substring(lastIndex);
  // if (remainingText) {
  //   parts.push(remainingText);
  // }

  // return <div className="whitespace-pre-wrap">{parts}</div>;
  // let newStr: any = "";
  // const mentionRegex = /@[\w]+/g;
  // const matchMentionValue = str.match(mentionRegex);
  // if (matchMentionValue) {
  //   return str.split(mentionRegex).map((el, index, array) => {
  //     if (index < array.length - 1) {
  //       const c = matchMentionValue.shift();
  //       return (
  //         <>
  //           {el}
  //           <span className="text-primary">{c}</span>
  //         </>
  //       );
  //     }
  //     return el;
  //   });
  // }
  // console.log("newstr", newStr);
  // return <div>{newStr}</div>;
};
