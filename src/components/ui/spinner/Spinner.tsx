import { FC } from "react";
import cn from "classnames";
interface Props {
  className?: string;
}

export const Spinner: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-7 h-7 rounded-full border-4 border-slate-300 border-t-blue-500 animate-spin",
        className
      )}
    ></div>
  );
};
