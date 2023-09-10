import { IUser } from "../user/user.interface";

export interface IPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  text: string;
  comment: any;
  likes: any;
  user: IUser;
}
