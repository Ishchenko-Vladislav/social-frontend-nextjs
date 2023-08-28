import { AuthService, ILoginFields, IRegisterFields } from "@/services/auth/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
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
