import { IUser } from "../user/user.interface";

export interface IComment {
  id: string;
  text: string | null;
  likes: any[];
  likesCount: number;
  user: IUser;
  attachment: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentDto {
  text?: string;
  attachment?: string | ArrayBuffer | null;
}
