"use client";
import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/navigation";
interface Props {
  title: string;
}

export const HeaderBack: FC<Props> = ({ title }) => {
  const { back } = useRouter();
  return (
    <div className="flex gap-3 z-20 items-center text-lg  border-border h-12 px-2 sticky top-0 bg-background/20 backdrop-blur-md">
      <div
        aria-label="back"
        className="w-8 h-8 transition-colors rounded-full hover:bg-accent flex justify-center items-center cursor-pointer"
        onClick={() => back()}
      >
        <BiArrowBack />
      </div>
      <div>{title}</div>
    </div>
  );
};
