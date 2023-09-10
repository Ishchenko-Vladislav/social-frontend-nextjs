"use client";
import { FormInput } from "@/components/ui/inputs/FormInput";
import { useForm, SubmitHandler, RegisterOptions } from "react-hook-form";
import styles from "./Form.module.scss";
import { UseMutateFunction } from "@tanstack/react-query";
import { IAxiosErrorData } from "@/hooks/useAuth";
import { ITokens } from "@/services/auth/auth.interface";
import { cn } from "@/shadcn/utils";
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
  submitAction: UseMutateFunction<ITokens, unknown, T, unknown>;
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
      <button className={styles.button} disabled={isLoading} type="submit">
        <span>{buttonTitle}</span>
      </button>
    </form>
  );
}
