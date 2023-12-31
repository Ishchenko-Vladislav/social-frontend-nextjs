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
  status: "/user/status/subscription/",
  followers: "/user/followers/",
  following: "/user/following/",
  follow: "/user/subscribe/",
};
export const POST_ROUTE = {
  followingPosts: "/post/my/following/posts",
  like: (id: string) => `/post/${id}/like`,
  bookmark: "/post/bookmark/",
  bookmarks: "/post/bookmarks",
  profilePosts: "/post/profile/posts",
  profilePostsWithLikes: "/post/profile/posts/likes",
  postById: "/post/",
  createPost: "/post/create",
};

export const COMMENT_ROUTE = {
  sendComment: "/comment/",
  likeToComment: (commentId: string) => `/comment/${commentId}/like`,
};

export const CONVERSATION_ROUTE = {
  getConversation: "/conversation/me",
  getConversationById: "/conversation/",
  createConversation: "/conversation/create/",
  getMessages: "/conversation/message/",
  sendMessage: "/conversation/message/send/",
};

export const QUERY_KEY = {
  following_posts: "following_posts",
  profile_posts: "my_posts",
  profile_posts_with_likes: "profile_posts_with_likes",
  own_profile: "own_profile",
  profile: "profile",
  followers: "followers",
  followings: "followings",
  bookmarks: "bookmarks",
  post_by_id: "post_by_id",
  comments: "comments",
  conversation: "conversation",
  conversation_by_id: "conversation_by_id",
  messages: "messages",
};

export const CloudinaryUrl = {
  upload: (resource_type: string) =>
    `https://api.cloudinary.com/v1_1/daswkls85/${resource_type}/upload`,
  destroy: (resource_type: string) =>
    `https://api.cloudinary.com/v1_1/daswkls85/${resource_type}/destroy`,
};
