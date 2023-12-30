import { CloudinaryResponse } from "../file/file.interface";
import { IUser } from "../user/user.interface";

export interface ICreatedConversationResponse {
  users: { id: string }[];
  type: TConversationType;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConversation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: TConversationType;
  users: IUser[];
  lastMessageSent: null | string;
}

export type TConversationType = "private";

export interface IMessage {
  id: string;
  content: string;
  read: boolean;
  user: IUser;
  conversation: IConversation;
  attachment?: CloudinaryResponse[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageDTO {
  content: string;
}
