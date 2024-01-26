import { FC, HTMLAttributes, MouseEvent } from "react";
import { BiMessageRounded } from "react-icons/bi";
import cn from "classnames";
import { TooltipForPost } from "../tooltip/TooltipForPost";
import { CreateCommentModal } from "@/components/something/create-comment-modal/CreateCommentMobile";
interface Props extends HTMLAttributes<HTMLDivElement> {
  count: number;
  queryKey: string;
  postId: string;
  withModal: boolean;
}

export const Comment: FC<Props> = ({ queryKey, count, postId, withModal, ...attr }) => {
  const CommentHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // like(id);
  };
  return (
    <button onClick={CommentHandle}>
      <CreateCommentModal
        withModal={withModal}
        queryKey={queryKey}
        count={count}
        postId={postId}
      ></CreateCommentModal>
    </button>
  );
  // return (
  //   <div {...attr} className={cn("flex cursor-pointer items-center w-fit group px-2 -ml-4")}>
  //     <TooltipForPost show="Reply">
  //       <div className={cn(`rounded-full p-2 group-hover:bg-blue-500/20 transition-colors`)}>
  //         <div className="flex justify-center items-center">
  //           <BiMessageRounded className={cn(`sm:text-lg text-sm group-hover:text-blue-500`)} />
  //         </div>
  //       </div>
  //     </TooltipForPost>
  //     <span className={`text-sm group-hover:text-blue-500 select-none`}>{count}</span>
  //   </div>
  // );
};
