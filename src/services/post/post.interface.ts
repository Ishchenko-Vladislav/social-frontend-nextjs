import { IUser } from "../user/user.interface";

export interface IPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  text: string;
  commentsCount: number;
  likesCount: number;
  bookmarksCount: number;
  likes: Ien[];
  bookmarks: Ien[];
  user: IUser;
}
type Ien = { id: string };
