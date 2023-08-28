"use client";
import { FC } from "react";
import styles from "./Login.module.scss";
import Link from "next/link";
import { Form } from "../form/Form";
import { loginFields } from "./login.data";
import { AuthService } from "@/services/auth/auth.service";
import { useLogin } from "@/hooks/useAuth";
import { ILoginFields, IRegisterFields } from "@/services/auth/auth.service";
import { ACCESS_TOKEN_MAX_AGE } from "@/utils/constants";
import { toast } from "react-hot-toast/headless";

interface Props {}

export const Login: FC<Props> = () => {
  const { mutate, isLoading, error } = useLogin();
  // toast.promise(, {
  //   loading: 'Loading',
  //   success: 'Got the data',
  //   error: 'Error when fetching',
  // });
  console.log("error login", error?.response?.data.message);
  return (
    <div className={styles.page}>
      <h2>Login</h2>
      <Form<ILoginFields>
        isLoading={isLoading}
        submitAction={mutate}
        buttonTitle="Login"
        fields={loginFields}
        error={error?.response?.data || null}
      />
      <p>
        Don't have an account? <Link href={"register"}>Create new account</Link>
      </p>
    </div>
  );
};
