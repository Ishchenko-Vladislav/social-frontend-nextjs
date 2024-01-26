"use client";
import { FC, PropsWithChildren } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";

export interface PickEmojiData {
  id: string;
  keywords: string[];
  name: string;
  native: any;
  shortcodes: string;
  unified: string;
}
interface Props {
  onEmojiClick: (emoji: PickEmojiData) => void;
}

export const PickEmoji: FC<PropsWithChildren<Props>> = ({ children, onEmojiClick }) => {
  const { theme } = useTheme();
  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0 z-50 pointer-events-auto" asChild>
        <div className="p-0 relative ">
          <Picker
            onEmojiSelect={onEmojiClick}
            className="!h-10"
            theme={theme}
            data={data}
            dynamicWidth
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
