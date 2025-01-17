import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import client from '../../../../config/letta-client';

async function getAgents(req: NextApiRequest) {
    try {
        const agents = await client.agents.list();
        const sortedAgents = agents.sort((a, b) => {
            const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
            const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
            return dateB - dateA;
        });
        return NextResponse.json(sortedAgents);
    } catch (error) {
        console.error('Error fetching agents:', error);
        return NextResponse.json({ error: 'Error fetching agents' }, { status: 500 });
    }
}

async function createAgent(req: NextApiRequest) {
    const DEFAULT_MEMORY_BLOCKS = [
        {
            label: 'human',
            value: "The human'''s name is Bob the Builder",
        },
        {
            label: 'persona',
            value: 'My name is Sam, the all-knowing sentient AI.',
        },
    ];
    const DEFAULT_LLM = 'openai/gpt-4o';
    const DEFAULT_EMBEDDING = 'openai/text-embedding-ada-002';

    try {
        const newAgent = await client.agents.create({
            memoryBlocks: DEFAULT_MEMORY_BLOCKS,
            llm: DEFAULT_LLM,
            embedding: DEFAULT_EMBEDDING,
        });
        return NextResponse.json(newAgent);
    } catch (error) {
        console.error('Error creating agent:', error);
        return NextResponse.json({ error: 'Error creating agent' }, { status: 500 });
    }
}

export const GET = getAgents;
export const POST = createAgent;
