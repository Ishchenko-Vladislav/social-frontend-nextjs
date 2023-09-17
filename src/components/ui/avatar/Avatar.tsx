import { FC, ButtonHTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { PiUserLight } from "react-icons/pi";
import cn from "classnames";
import Image from "next/image";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  avatarPath: string | null | undefined;
}

export const AvatarIcon: FC<Props> = ({ avatarPath, className, ...atr }) => {
  return (
    <>
      <Avatar {...atr} className={cn("w-8 h-8 shrink-0 border-0", className)}>
        <AvatarImage src={avatarPath || ""} />
        <AvatarFallback className="relative">
          {/* <PiUserLight className={cn("text-2xl", fallbackStyle)} /> */}
          <Image src={"/default_profile.png"} alt="default_profile" fill />
        </AvatarFallback>
      </Avatar>
    </>
  );
};
