import { FC, HTMLAttributes } from "react";
import { BiMessageRounded } from "react-icons/bi";
import cn from "classnames";
interface Props extends HTMLAttributes<HTMLDivElement> {
  count: number;
  queryKey: string;
}

export const Comment: FC<Props> = ({ queryKey, count, ...attr }) => {
  return (
    <div {...attr} className={cn("flex  items-center group w-20 -ml-2")}>
      <div className={cn(`rounded-full p-2 group-hover:bg-blue-500/20 `)}>
        <div>
          <BiMessageRounded className={cn(`sm:text-lg text-sm group-hover:text-blue-500`)} />
        </div>
      </div>
      <span className={`text-sm group-hover:text-blue-500 select-none`}>{count}</span>
    </div>
  );
};
