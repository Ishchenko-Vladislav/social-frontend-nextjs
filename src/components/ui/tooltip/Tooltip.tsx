import { FC, PropsWithChildren, ReactNode } from "react";
import { Tooltip as T, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shadcn/ui/tooltip";
interface Props {
  show: ReactNode;
}

export const Tooltip: FC<PropsWithChildren<Props>> = ({ children, show }) => {
  return (
    <TooltipProvider delayDuration={500}>
      <T>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="px-2 py-0.5 text-xs" side="bottom">
          {show}
        </TooltipContent>
      </T>
    </TooltipProvider>
  );
};
