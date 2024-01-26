"use client";
import { FC } from "react";
import styles from "./Register.module.scss";
import Link from "next/link";
import { Form } from "../form/Form";
import { registerFields } from "./register.data";
import { useRegister } from "@/hooks/useAuth";
import { IRegisterFields } from "@/services/auth/auth.interface";
interface Props {}

export const Register: FC<Props> = () => {
  const { mutate, isPending, error } = useRegister();

  return (
    <div className={styles.page}>
      <h2>Register</h2>
      <Form<IRegisterFields>
        isLoading={isPending}
        submitAction={mutate}
        fields={registerFields}
        buttonTitle="Create new account"
        error={error?.response?.data || null}
      />
      <p>
        Already have an account? <Link href={"login"}>login</Link>
      </p>
    </div>
  );
};
