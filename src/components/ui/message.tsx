import * as React from 'react';
import { cn } from '@/lib/utils';

interface MessagePillProps {
    message: string;
    sender: 'user_message' | 'tool_call_message';
}

const MessagePill: React.FC<MessagePillProps> = ({ message, sender }) => {
	return (
		<div
			className={cn(
				'flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm',
				sender === 'user_message'
					? 'ml-auto bg-primary text-primary-foreground'
					: 'bg-muted'
			)}
		>
			{message}
		</div>
	);
};

export { MessagePill };
