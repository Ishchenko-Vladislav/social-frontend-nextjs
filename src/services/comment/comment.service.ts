import { axiosInstance } from "@/api/instance";
import { API_URL, COMMENT_ROUTE } from "@/utils/constants";
import { IComment, ICommentDto } from "./comment.interface";

export const CommentService = {
  async sendComment(comment: ICommentDto, postId: string) {
    const response = await axiosInstance.post<IComment>(
      API_URL + COMMENT_ROUTE.sendComment + postId,
      comment
    );
    return response.data;
  },
  async getComments(postId: string, pageParam: number) {
    const response = await axiosInstance.get<IComment[]>(
      API_URL + COMMENT_ROUTE.sendComment + postId,
      {
        params: {
          pageParam,
        },
      }
    );
    return response.data;
  },
  async likeToComment(commentId: string) {
    const response = await axiosInstance.put<IComment>(
      API_URL + COMMENT_ROUTE.likeToComment(commentId)
    );
    return response.data;
  },
};
