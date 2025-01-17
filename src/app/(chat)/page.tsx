"use client"

import { Messages } from "@/components/messages";
import { MessageComposer } from "@/components/message-composer";


export default function Home() {
  return (
    <div className="gap-5 flex overflow-hidden relative flex-col min-w-0 py-4 h-full bg-background">
      <div className="flex-1 overflow-auto">
        <Messages />
      </div>
      <MessageComposer />
    </div>
  );
}
