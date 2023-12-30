import { CloudinaryFile, CloudinaryFileUpload, CloudinaryResponse } from "../file/file.interface";
import { IUser } from "../user/user.interface";

export interface IComment {
  id: string;
  text: string | null;
  likes: any[];
  likesCount: number;
  user: IUser;
  attachment: CloudinaryFile[];
  createdAt: Date;
  updatedAt: Date;
}
export type TCommentInfo = {
  mentions: any[];
  hashtags: any[];
};
export interface ICommentDto {
  text?: string;
  attachment?: CloudinaryResponse[] | null;
  info?: TCommentInfo;
}
