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

interface IAuthorizationContext {
  isAuthorization: boolean;
  setIsAuthorization: Dispatch<SetStateAction<boolean>>;
}

const AuthorizationContext = createContext({} as IAuthorizationContext);
export const useAuth = () => {
  return useContext(AuthorizationContext);
};
export const AuthorizationProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthorization, setIsAuthorization] = useState(false);
  const pathname = usePathname();
  const { replace } = useRouter();
  useEffect(() => {
    checkAuth();
  }, [pathname]);
  const checkAuth = async () => {
    const access_token = Cookie.get(TOKENS_ENUM.ACCESS_TOKEN);
    const refresh_token = Cookie.get(TOKENS_ENUM.REFRESH_TOKEN);

    if (!access_token && refresh_token) {
      try {
        const tokens = await AuthService.refresh(refresh_token);
        if (tokens && tokens.access_token) {
          return AuthService.setTokensToCookie(tokens);
        }
      } catch (error) {
        return replace("/login");
      }
    }

    if (publicRoute.includes(pathname) && access_token) {
      return replace("/");
    }

    if (!publicRoute.includes(pathname) && !access_token && !refresh_token) {
      return replace("/login");
    }
  };
  return (
    <AuthorizationContext.Provider value={{ isAuthorization, setIsAuthorization }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

const publicRoute = [PAGES_ROUTE.login, PAGES_ROUTE.register];
