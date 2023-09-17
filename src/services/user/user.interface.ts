export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  userName: string;
  displayName: string;
  isVerified: boolean;
  avatarPath: string | null;
  following: [];
  followers: [];
  followersCount: number;
  followingCount: number;
}

export interface ISub {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  toUser: IUser;
  fromUser: IUser;
}
