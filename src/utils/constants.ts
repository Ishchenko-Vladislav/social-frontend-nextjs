// interface IDecor {
//   blue: string;
//   yellow: string;
//   purple: string;
//   pink: string;
//   orange: string;
//   green: string;
// }
// // enum Decor {
// //     blue = '#1D9BF0'
// // }
// type DecorType = "blue" | "yellow" | "purple" | "pink" | "orange" | "green";
// export const dictionaryDecorating: Record<DecorType, string> = {
//   blue: "#1D9BF0",
//   green: "#00BA7C",
//   orange: "#FF7A00",
//   pink: "#F91880",
//   purple: "#7856FF",
//   yellow: "#FFD400",
// };
export const API_URL = `${process.env.SERVER_URL}`;
export const ACCESS_TOKEN_MAX_AGE = 10 * 60 * 60 * 1000;
export enum TOKENS_ENUM {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}
export const PAGES_ROUTE = {
  home: "/",
  login: "/login",
  register: "/register",
  explore: "/explore",
  messages: "/messages",
  notification: "/notification",
  profile: "/profile",
};

export const AUTH_ROUTE = {
  login: "/auth/login",
  register: "/auth/register",
  logout: "/auth/logout",
  refresh: "/auth/v1/secret/refresh",
  status: "/auth/status",
};

export const USER_ROUTE = {
  ownProfile: "/user/profile",
  profile: "/user/profile",
  search: "/user/search",
};
export const POST_ROUTE = {
  followingPosts: "/post/my/following/posts",
};
