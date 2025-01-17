import { AppMessage, MessageType } from '@/types';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import client from '../../../../config/letta-client';

// TODO: fix typing below once SDK is fixed
function filterMessages(data: AppMessage[]): AppMessage[] {
  return data
    .filter((item) => {
      if (item.messageType === MessageType.USER_MESSAGE) {
        try {
          const parsedMessage = JSON.parse(item.message || '{}');
          return !!parsedMessage.message;
        } catch {
          return false;
        }
      }
      return item.messageType === MessageType.TOOL_CALL_MESSAGE;
    })
    .map(({ messageType, id, message, date, toolCall }) => {
      let extractedMessage = '';
      if (messageType === MessageType.USER_MESSAGE && message) {
        try {
          const parsedMessage = JSON.parse(message);
          extractedMessage = parsedMessage.message || '';
        } catch (error) {
          console.error(`Failed to parse user_message for id ${id}:`, error);
        }
      }
      if (messageType === MessageType.TOOL_CALL_MESSAGE && toolCall) {
        try {
          const parsedArguments = JSON.parse(toolCall.arguments);
          extractedMessage = parsedArguments.message || '';
        } catch (error) {
          console.error(`Failed to parse toolCall arguments for id ${id}:`, error);
        }
      }
      return {
        messageType,
        id,
        date,
        message: extractedMessage,
      };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date in ascending order
}

async function getAgentMessages(
  req: NextApiRequest,
  { params }: { params: { agentId: string } },
) {
  try {
    const { agentId } = await params;
    const messages = await client.agents.messages.list(agentId, {
      limit: 100,
    });
    console.log;
    const result = filterMessages(messages);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return {};
  }
}

async function sendMessage(
  req: NextRequest,
  { params }: { params: { agentId: string } },
) {
  const { role, text } = await req.json();
  const { agentId } = await params;

  // set up evenstream
  const encoder = new TextEncoder();

  const response = new NextResponse(
    new ReadableStream({
      async start(controller) {
        const response = await client.agents.messages.stream(agentId, {
          messages: [
            {
              role,
              text,
            },
          ],
        });

        for await (const chunk of response) {
          console.log('chunk', chunk);
          const messageToSend = filterMessages([chunk])?.[0];

          if (!messageToSend) {
            return;
          }

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(messageToSend)}\n\n`),
          );
        }

        // Close connection on request close
        req.signal.addEventListener('abort', () => {
          controller.close();
        });
      },
    }),
    {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    },
  );

  return response;
}

export const GET = getAgentMessages;
export const POST = sendMessage;
