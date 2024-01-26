"use client";
import React from "react";
import { NewMessageDialog } from "./components/new-message-dialog/NewMessageDialog";
import { Button } from "@/shadcn/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { UsersContainer } from "./components/users-container/UsersContainer";

interface Props {}

const Messages = (props: Props) => {
  const match = useMediaQuery(767);

  if (!match) {
    return (
      <div className="h-full min-w-[50px]">
        <div className="w-full h-full flex flex-col">
          <div
            className={
              "px-2 text-xl flex flex-col gap-4 font-semibold items-center justify-center flex-1"
            }
          >
            <div>
              <span className="text-2xl font-bold">Select a message</span>
            </div>
            <div>
              <span className="text-muted-foreground">
                Choose from your existing conversations or start a new one.
              </span>
            </div>
            <NewMessageDialog>
              <Button className="uppercase p-6 rounded-full w-fit">write message</Button>
            </NewMessageDialog>
          </div>
        </div>
      </div>
    );
  }
  return <UsersContainer isCollapsed={false} />;
};

export default Messages;
