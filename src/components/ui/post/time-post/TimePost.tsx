"use client";
import { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shadcn/ui/tooltip";
interface Props {
  createdAt: Date;
}

export const TimePost: FC<Props> = ({ createdAt }) => {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(0);
  useEffect(() => {
    const date1 = dayjs(createdAt);
    const diff = dayjs().diff(date1, "hour");
    setData(diff);
  }, []);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="text-muted-foreground ml-2 flex items-center gap-2">
      {mounted && (
        <div>
          <span className="font-bold">·</span>{" "}
          <TooltipProvider disableHoverableContent>
            <Tooltip>
              <TooltipTrigger>
                <span className="hover:underline cursor-pointer">
                  {data <= 24 ? dayjs(createdAt).fromNow() : dayjs(createdAt).format("D ddd")}
                </span>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-0.5 text-xs font-light" side="bottom">
                {dayjs(createdAt).format("h:MM A · DD ddd YYYY")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};
