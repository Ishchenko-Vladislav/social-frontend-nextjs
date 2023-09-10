export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  userName: string;
  displayName: string;
  isVerified: boolean;
  avatarPath: string | null;
  following: number;
  followers: number;
}
