import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { IField } from "../form/Form";

// interface IField {
//     name: Path<any>;
//     label: string;
//     register: UseFormRegister<any>;
//     options: RegisterOptions;
//     errors: any;
// }

export const loginFields: IField[] = [
  {
    label: "E-mail",
    name: "email",
    options: {
      required: "this field is required",
      pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "invalid email address" },
    },
  },
  {
    label: "Password",
    name: "password",
    options: {
      required: "this field is required",
      minLength: { value: 6, message: "password must be more than 6" },
      maxLength: { value: 50, message: "password must be less than 50" },
    },
  },
];
