"use client";
import { PAGES_ROUTE, TOKENS_ENUM } from "@/utils/constants";
import { usePathname, useRouter } from "next/navigation";
// import { cookies } from "next/headers";
import Cookie from "js-cookie";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthService } from "@/services/auth/auth.service";
import { IAuthUser, useIsAuth } from "@/hooks/useAuth";
import { Preloader } from "@/components/preloader/Preloader";

interface IAuthorizationContext {
  // isAuthorization: boolean;
  // setIsAuthorization: Dispatch<SetStateAction<boolean>>;
  user: IAuthUser;
  logout: () => void;
}

const AuthorizationContext = createContext({} as IAuthorizationContext);
export const useAuth = () => {
  return useContext(AuthorizationContext);
};
export const AuthorizationProvider = ({ children }: { children: ReactNode }) => {
  // const [isAuthorization, setIsAuthorization] = useState(false);
  const { push } = useRouter();

  const { isLoading, user } = useIsAuth();
  const logout = () => {
    Cookie.remove(TOKENS_ENUM.ACCESS_TOKEN);
    Cookie.remove(TOKENS_ENUM.REFRESH_TOKEN);
    localStorage && localStorage.clear();
    push("/login");
  };
  // const pathname = usePathname();
  // useEffect(() => {
  //   checkAuth();
  // }, [pathname]);
  // const checkAuth = async () => {
  //   const access_token = Cookie.get(TOKENS_ENUM.ACCESS_TOKEN);
  //   const refresh_token = Cookie.get(TOKENS_ENUM.REFRESH_TOKEN);

  //   if (!access_token && refresh_token) {
  //     try {
  //       const tokens = await AuthService.refresh(refresh_token);
  //       if (tokens && tokens.access_token) {
  //         return AuthService.setTokensToCookie(tokens);
  //       }
  //     } catch (error) {
  //       clearAll()
  //       return replace(PAGES_ROUTE.login);
  //     }
  //   }

  //   if (publicRoute.includes(pathname) && access_token) {
  //     return replace(PAGES_ROUTE.home);
  //   }

  //   if (!publicRoute.includes(pathname) && !access_token && !refresh_token) {
  //     return replace(PAGES_ROUTE.login);
  //   }
  // };

  // const clearAll = () => {
  //   AuthService.logout();
  //   localStorage && localStorage.clear();
  // };
  if (isLoading) return <Preloader />;
  return (
    <AuthorizationContext.Provider value={{ user, logout }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

const publicRoute = [PAGES_ROUTE.login, PAGES_ROUTE.register];
