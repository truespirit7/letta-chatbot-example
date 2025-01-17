'use client'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AgentProvider } from './context/agent-context';
import { SidebarContent } from '@/components/sidebar-content';


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
