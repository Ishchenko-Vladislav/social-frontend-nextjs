import { CloudinaryFile, CloudinaryResponse } from "../file/file.interface";
import { IUser } from "../user/user.interface";

export interface IPostShort {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  commentsCount: number;
  likesCount: number;
  bookmarksCount: number;
  likes: Ien[];
  bookmarks: Ien[];
  user: IUser;
  attachment: CloudinaryFile[];

  info: TPostInfo;
}
type Ien = { id: string };
interface ITag {
  id: string;
  name: string;
  postCount: number;
}
export interface IPost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  commentsCount: number;
  likesCount: number;
  bookmarksCount: number;
  comments: [];
  likes: Ien[];
  bookmarks: Ien[];
  user: IUser;
  tags: ITag[];
  attachment: CloudinaryFile[];
  info: TPostInfo;
}
export type TPostInfo = {
  mentions: any[];
  hashtags: any[];
};

export interface IBookmarks {
  id: string;
  post: IPostShort;
}

export interface IPostDTO {
  text?: string;
  info?: TPostInfo;
  attachment?: CloudinaryResponse[] | null;
}
