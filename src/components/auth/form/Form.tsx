"use client";
import { FormInput } from "@/components/ui/inputs/FormInput";
import { FC } from "react";
import { useForm, SubmitHandler, RegisterOptions } from "react-hook-form";
import styles from "./Form.module.scss";
import { UseMutateFunction } from "@tanstack/react-query";
import { ILoginFields, IRegisterFields } from "@/services/auth/auth.service";
import { IAuthData } from "@/services/auth/auth.helper";
import { IAxiosErrorData } from "@/hooks/useAuth";
import { error } from "console";
import { Spinner } from "@/components/ui/spinner/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/buttons/Button";
export interface IField {
  label: string;
  name: string;
  options: RegisterOptions;
}
interface Props<T> {
  fields: IField[];
  buttonTitle: string;
  isLoading: boolean;
  error: IAxiosErrorData | null;
  submitAction: UseMutateFunction<IAuthData, unknown, T, unknown>;
}
export interface IAuthField {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function Form<T>({ fields, buttonTitle, isLoading, submitAction, error }: Props<T>) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = async (data) => submitAction(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {fields.map((field) => (
        <FormInput
          key={field.name}
          label={field.label}
          name={field.name}
          errors={errors}
          options={field.options}
          register={register}
        />
      ))}
      <button disabled={isLoading} type="submit">
        <span className={styles.title}>{buttonTitle}</span>
      </button>
    </form>
  );
}
