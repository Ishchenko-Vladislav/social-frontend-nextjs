import { FC } from "react";
import { Path, UseFormRegister, RegisterOptions } from "react-hook-form";
import styles from "./FormInput.module.scss";

interface IError {
  type: string;
  message: string;
}
type InputProps = {
  name: Path<any>;
  label: string;
  register: UseFormRegister<any>;
  options: RegisterOptions;
  errors: any;
};
export const FormInput: FC<InputProps> = ({ errors, label, options, name, register }) => {
  return (
    <>
      <div className={styles.input}>
        <input placeholder="" type="text" {...register(name, options)} />
        <label htmlFor="">{label}</label>
        {errors[name] && <p>{errors[name].message}</p>}
      </div>
    </>
  );
};
