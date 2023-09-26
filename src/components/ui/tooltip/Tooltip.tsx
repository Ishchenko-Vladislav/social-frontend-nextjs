import { FC, PropsWithChildren, ReactNode } from "react";
import { Tooltip as T, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shadcn/ui/tooltip";
interface Props {
  content: ReactNode;
}

export const Tooltip: FC<PropsWithChildren<Props>> = ({ children, content }) => {
  return (
    <TooltipProvider delayDuration={500}>
      <T>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="px-2 py-0.5 text-xs" side="bottom">
          {content}
        </TooltipContent>
      </T>
    </TooltipProvider>
  );
};
