export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  userName: string;
  displayName: string;
  isVerified: boolean;
  avatarPath: string | null;
  // following: any[];
  followers: any[];
  followersCount: number;
  followingCount: number;
}

export interface ISub {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fromUser: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    userName: string;
    displayName: string;
    isVerified: boolean;
    avatarPath: string | null;
    followingCount: number;
    followersCount: number;
  };
  toUser: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    userName: string;
    displayName: string;
    isVerified: boolean;
    avatarPath: string | null;
    followingCount: number;
    followersCount: number;
    followers: [
      {
        id: string;
        createdAt: Date;
        updatedAt: Date;
      }
    ];
  };
}

export interface IFollowing {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fromUser: IUser;

  toUser: IUser;
}

/* 
& {
    followers: [
      {
        id: string;
        createdAt: Date;
        updatedAt: Date;
      }
    ];
  };
*/
export interface IFollower {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fromUser: IUser;
  toUser: IUser;
}

// export interface ISub {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
//   toUser: IUser;
//   fromUser: IUser;
// }
// interface IF1 {
//   id: string;
//   createdAt: string;
//   updatedAt: string;
//   fromUser: IUser;
// }
// interface IF2 {
//   id: string;
//   createdAt: string;
//   updatedAt: string;
//   toUser: IUser;
// }
// export interface IFollowers extends IUser {
//   followers: IF1[];
// }
// export interface IFollowing extends IUser {
//   following: IF2[];
// }
