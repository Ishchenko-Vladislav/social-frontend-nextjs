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
  user: IUser;
  tags: ITag[];
}
