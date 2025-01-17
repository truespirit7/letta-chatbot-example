'use client';
import { Letta } from '@letta-ai/letta-client';
import { useQuery } from '@tanstack/react-query';

export const USE_AGENTS_KEY = ['agents'];

export function useAgents() {
  return useQuery<Letta.AgentState[]>({
    queryKey: USE_AGENTS_KEY,
    queryFn: () => fetch('/api/agents').then((res) => res.json()),
  });
}
