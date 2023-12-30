"use client";
import { FC, PropsWithChildren, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shadcn/ui/resizable";
import { UsersContainer } from "./components/users-container/UsersContainer";
import { cn } from "@/utils/utils";

const layout: FC<PropsWithChildren> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div>
      <ResizablePanelGroup direction="horizontal" className="min-h-[100dvh]">
        <ResizablePanel
          collapsible={true}
          collapsedSize={5}
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
    </div>
  );
};

export default layout;
