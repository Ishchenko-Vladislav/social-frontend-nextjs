export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  avatarPath: string | null;
}
