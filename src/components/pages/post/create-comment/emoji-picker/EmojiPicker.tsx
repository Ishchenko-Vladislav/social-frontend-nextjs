"use client";
import { useWindowSize } from "@/hooks/useWindowSize";
import { FC, useEffect, useState } from "react";
import data from "@emoji-mart/data";
// import { EmojiPicker } from "./emoji-picker/EmojiPicker";
import Picker from "@emoji-mart/react";
import { cn } from "@/utils/utils";
interface Props {
  close: () => void;
  selectedEmoji: (e: any) => void;
  className?: string;
}

export const EmojiPicker: FC<Props> = ({ close, selectedEmoji, className }) => {
  const { width } = useWindowSize();
  const [mounted, setMounted] = useState(false);
  const [options, setOptions] = useState({});
  useEffect(() => {
    setOptions({
      //   perLine: width > 767 ? 9 : 6,
    });

    setMounted(true);

    return () => {
      setMounted(false);
      setOptions({});
    };
  }, []);

  return (
    <div
      className={cn(
        "absolute -left-10 top-10 w-[300px] sm:w-[400px] border z-10 rounded-xl h-[300px] overflow-hidden",
        className
      )}
    >
      {mounted ? (
        <Picker
          //   className="max-w-[250px] w-full"
          dynamicWidth={true}
          emojiSize={18}
          //   style={{
          //     width: "auto",
          //   }}
          // emojiButtonSize={24}
          // perLine={width ? (width > 767 ? 9 : 6) : 6}
          showSkinTones={false}
          previewPosition="none"
          {...options}
          data={data}
          onClickOutside={() => close()}
          onEmojiSelect={selectedEmoji}
        />
      ) : null}
    </div>
  );
};
