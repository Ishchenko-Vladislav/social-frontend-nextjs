"use client";
import { FC } from "react";
import styles from "./Login.module.scss";
import Link from "next/link";
import { Form } from "../form/Form";
import { loginFields } from "./login.data";
import { useLogin } from "@/hooks/useAuth";
import { ILoginFields } from "@/services/auth/auth.interface";

interface Props {}

export const Login: FC<Props> = () => {
  const { mutate, isPending, error } = useLogin();

  return (
    <div className={styles.page}>
      <h2>Login</h2>
      <Form<ILoginFields>
        isLoading={isPending}
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
