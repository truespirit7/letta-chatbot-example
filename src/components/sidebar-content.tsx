import Header from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { LoaderCircle, PlusIcon } from 'lucide-react';
import { AppSidebar } from '@/components/app-sidebar';
import { Sidebar } from './ui/sidebar';
import { useAgentContext } from '@/app/(chat)/context/agent-context';
import { useCreateAgent } from './hooks/use-create-agent';
import { useQueryClient } from '@tanstack/react-query';
import { USE_AGENTS_KEY } from './hooks/use-agents';
import { AgentState } from '@letta-ai/letta-client/api';

export function SidebarContent() {
	const { setAgentId } = useAgentContext();
	const queryClient = useQueryClient();
	const { mutate: createAgent, isPending } = useCreateAgent();

	const handleCreateAgent = () => {
		if (isPending) return;
		createAgent(undefined, {
			onSuccess: (data) => {
				queryClient.setQueriesData({ queryKey: USE_AGENTS_KEY }, (oldData: AgentState[]) => {
					return [data, ...oldData]
				})
				setAgentId(data.id)
			}
		});
	}

	return (
		<Sidebar>
			<div className="flex flex-row justify-between items-center">
				<Header title="Chatbot" />
				<div className="flex justify-end p-2">
					<Button
						disabled={isPending}
						type="button" onClick={handleCreateAgent} className="text-primary w-8 h-8 rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit bg-transparent shadow-none hover:hover:bg-sidebar-accent">
						{isPending ?
							<LoaderCircle className="animate-spin" size={17} /> :
							<PlusIcon width={17} height={17} />
						}
					</Button>

				</div>
			</div>
			<AppSidebar />
		</Sidebar>
	);
} 