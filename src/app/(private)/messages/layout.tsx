"use client";
import { FC, PropsWithChildren, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shadcn/ui/resizable";
import { UsersContainer } from "./components/users-container/UsersContainer";
import { cn } from "@/utils/utils";
import { ConversationProvider } from "@/context/ConversationContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const layout: FC<PropsWithChildren> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const match = useMediaQuery(767);
  // if (match) {
  //   return children;
  // }
  return (
    <ConversationProvider>
      {!match ? (
        <ResizablePanelGroup direction="horizontal" className="min-h-[100dvh]">
          <ResizablePanel
            collapsible={true}
            collapsedSize={6}
            onCollapse={() => {
              setIsCollapsed(true);
            }}
            onExpand={() => {
              setIsCollapsed(false);
            }}
            defaultSize={30}
            maxSize={40}
            minSize={20}
            className={cn("", {
              ["transition-all duration-300 ease-in-out"]: isCollapsed,
            })}
          >
            <UsersContainer isCollapsed={isCollapsed} />
          </ResizablePanel>

          <ResizableHandle withHandle />
          <ResizablePanel>{children}</ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <>{children}</>
      )}
    </ConversationProvider>
  );
};

export default layout;
