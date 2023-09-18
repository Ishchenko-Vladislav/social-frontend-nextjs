export interface ILoginFields {
  email: string;
  password: string;
}
export interface IRegisterFields {
  email: string;
  displayName: string;
  password: string;
}
export interface ITokens {
  access_token: string;
  refresh_token: string;
}
export interface IStatus {
  status: boolean;
  id: string;
  userName: string;
}
