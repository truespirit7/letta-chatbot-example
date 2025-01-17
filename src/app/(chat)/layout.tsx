"use client"

import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/ui/header";
import { AgentProvider } from "./context/agent-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarContent } from "@/components/sidebar-content";


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AgentProvider>
        <SidebarContent />
        <main className="w-dvw h-dvh relative overflow-hidden flex flex-col">
          <SidebarTrigger />
          {children}
        </main>
      </AgentProvider>
    </SidebarProvider>
  )
}
