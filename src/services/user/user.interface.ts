export interface IUser {
  id: string;
  createdAt: string;
  updatedAt: string;
  bgPath: LowAttach | null;
  email: string;
  userName: string;
  displayName: string;
  isVerified: boolean;
  avatarPath: LowAttach | null;
  // following: any[];
  followers: any[];
  followersCount: number;
  followingCount: number;
}
export interface LowAttach {
  public_id: string;
  url: string;
}
export interface UpdateUserDto {
  displayName: string;
  avatarPath: LowAttach | null;
  bgPath: LowAttach | null;
  userName: string;
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
