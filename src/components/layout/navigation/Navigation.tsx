import { FC } from "react";
import styles from "./Navigation.module.scss";
import { NavigationItem } from "./navigation-item/NavigationItem";
import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { navigation } from "./Navigation.data";
import { User } from "./user/User";
import { cn } from "@/utils/utils";
import { useWindowSize } from "@/hooks/useWindowSize";
interface Props {}

export const Navigation: FC<Props> = () => {
  const pathname = usePathname();
  const {width} = useWindowSize()
  return (
    <div
      className={cn(
        `
    fixed 
    border-t select-none pointer-events-auto
    flex justify-around items-end gap-2
    xl:w-full xl:max-w-xs
    py-2 h-14 px-1 w-full
    bg-background
    text-foreground
    overflow-y-auto
    border-0
    shrink-0
    border-border
    mobile:sticky bottom-0
    mobile:top-0
    mobile:min-h-screen
    mobile:flex-col
    mobile:border-r
    mobile:w-16
    mobile:bg-background
    mobile:max-h-screen`,
        {
          ["hidden"]: pathname.includes("/messages/") && width < 500,
        }
      )}
      style={{
        zIndex: 3,
      }}
    >
      {navigation.map((item) => {
        return <NavigationItem pathname={pathname} key={item.title} {...item} />;
      })}
      <User />
    </div>
  );
};
