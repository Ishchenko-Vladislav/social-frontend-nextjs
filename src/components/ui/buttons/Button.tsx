import { FC, PropsWithChildren, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";
import { JsxAttribute } from "typescript";
import cn from "classnames";
interface Props {
  //   other?: HTMLAttributes<HTMLButtonElement>;
}

export const Button: FC<PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>> = ({
  children,
  className,
  ...other
}) => {
  return (
    <button {...other} className={cn(styles.but, className)}>
      <div className={styles.nested}>{children}</div>
      <span className={styles.loading}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </span>
    </button>
  );
};
