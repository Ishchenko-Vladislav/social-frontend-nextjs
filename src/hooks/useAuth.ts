import { ILoginFields, IRegisterFields } from "@/services/auth/auth.interface";
import { AuthService } from "@/services/auth/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Cookie from "js-cookie";
import { PAGES_ROUTE, TOKENS_ENUM } from "@/utils/constants";
import { useTheme } from "next-themes";
import { useConfig } from "@/context/ThemeConfig";
export interface IAxiosErrorData {
  message: string;
  error: string;
  statusCode: number;
}

export const useLogin = () => {
  const { push } = useRouter();
  return useMutation({
    mutationFn: async (payload: ILoginFields) => {
      const res = AuthService.login(payload);
      toast.promise(res, {
        loading: "Loading",
        success: "Successfully",
        error: (err) => err?.response?.data.message,
      });
      const result = await res;
      return result;
    },
    onSuccess: (data, variables, context) => {
      AuthService.setTokensToCookie(data);
      push("/");
    },
    onError(error: AxiosError<IAxiosErrorData, any>, variables, context) {
      return error;
    },
  });
};

export const useRegister = () => {
  const { push } = useRouter();

  return useMutation({
    mutationFn: async (payload: IRegisterFields) => {
      const res = AuthService.register(payload);
      toast.promise(res, {
        loading: "Loading",
        success: "Successfully",
        error: (err) => err?.response?.data.message,
      });
      const result = await res;
      return result;
    },
    onSuccess: (data, variables, context) => {
      AuthService.setTokensToCookie(data);
      push("/");
    },
    onError(error: AxiosError<IAxiosErrorData, any>, variables, context) {
      return error;
    },
  });
};

// USE IS AUTH --------------------------------------------------------------------------------------
// type AuthState = "loading" | "unAuthorization" | "authorization";
type VerifyToken = "loading" | "un_authorization" | "authorization" | "error";
export interface IAuthUser {
  id: string;
  userName: string;
}
export const useIsAuth = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { setTheme } = useTheme();
  const { setConfig } = useConfig();
  // const [isAuth, setIsAuth] = useState(false);
  // const [isAuth, setIsAuth] = useState<AuthState>("loading");

  const [user, setUser] = useState<IAuthUser>({ id: "", userName: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isVerify, setIsVerify] = useState<VerifyToken>("loading");
  // const [userName, setUserName] = useState("");
  const publicRoute = [PAGES_ROUTE.login, PAGES_ROUTE.register];
  const check = async () => {
    try {
      const access_token = Cookie.get(TOKENS_ENUM.ACCESS_TOKEN);
      const refresh_token = Cookie.get(TOKENS_ENUM.REFRESH_TOKEN);
      const isPublic = publicRoute.includes(pathname);
      if (!access_token && refresh_token) void not_access_token_and_refresh_token(refresh_token);
      if (isPublic && access_token) void public_and_access_token();
      if (!isPublic && !access_token && !refresh_token) void clear_info_and_redirect();
    } catch (error) {
      console.log("is auth wrong, try again", error);
    } finally {
      // setIsLoading(false);
    }
  };
  const public_and_access_token = () => {
    replace(PAGES_ROUTE.home);
  };
  // const not_public_and_not_tokens =  () => {
  //   clear_info_and_redirect()
  // }
  const not_access_token_and_refresh_token = async (refresh_token: string) => {
    try {
      const tokens = await AuthService.refresh(refresh_token);
      if (tokens && tokens.access_token) {
        return AuthService.setTokensToCookie(tokens);
      }
    } catch (error) {
      return clear_info_and_redirect();
    }
  };
  const clear_info_and_redirect = () => {
    AuthService.logout();
    localStorage && localStorage.clear();
    // setIsAuth(false);
    setConfig({ theme: "slate" });
    setTheme("light");
    replace(PAGES_ROUTE.login);
  };
  // const get_user_name = async () => new Promise((resolve, reject) => {
  //   // let b = null

  //   const userN = Cookie.get('user_name')
  //   if(userN) setUserName(userN)
  // })
  // const get_user_name = () => {
  //   const u = Cookie.get("user_name");
  //   if (u) setUserName(u);
  // };
  const verify_token = async () => {
    if (isVerify === "loading") {
      try {
        const s = await AuthService.getStatus();
        if (s) {
          if (s.status) {
            setUser({ id: s.id, userName: s.userName });
            setIsVerify("authorization");
          } else return setIsVerify("un_authorization");
        }
      } catch (error: any) {
        // console.log("auth error", error);
        if (error.response.status === 401) return setIsVerify("un_authorization");
        else setIsVerify("error");
      }
    }
  };
  useEffect(() => {
    verify_token();
    return () => {};
  }, []);

  useEffect(() => {
    if (isVerify === "un_authorization") clear_info_and_redirect();
    if (isVerify === "authorization") setTimeout(() => setIsLoading(false), 700);
    if (isVerify === "error") toast.error("something went wrong, please try again");
    return () => {};
  }, [isVerify]);

  useEffect(() => {
    check();
    return () => {};
  }, [pathname]);

  // useEffect(() => {
  //   // localStorage && localStorage.getItem('personalization_id')
  //   get_user_name()
  //   return () => {};
  // }, []);
  // useEffect(() => {
  //   if(!isAuth) {

  //   }
  //   return () => {};
  // }, [isAuth]);

  return { isLoading, user };
};

// export const useAuth = () => {
//   const { replace } = useRouter();
//   return useQuery({
//     queryKey: ["status"],
//     queryFn: () => AuthService.getStatus(),
//     onError(err: AxiosError) {
//       if (err.response?.status === 401) {
//         AuthService.logout();
//         replace("/login");
//       }
//     },
//     retry: (failureCount, error) => {
//       if (error.response?.status === 401) {
//         return false;
//       }
//       return true;
//     },
//   });
// };
