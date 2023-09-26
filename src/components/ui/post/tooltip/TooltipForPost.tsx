import { FC, PropsWithChildren } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shadcn/ui/tooltip";

interface Props {
  show: string;
}

export const TooltipForPost: FC<PropsWithChildren<Props>> = ({ children, show }) => {
  return (
    <TooltipProvider disableHoverableContent skipDelayDuration={0} delayDuration={500}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="px-1 py-0 text-xs rounded-none" side="bottom">
          {show}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
