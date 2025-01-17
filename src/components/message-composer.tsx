'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useRef } from 'react'
import { ArrowUpIcon } from 'lucide-react'
import { useAgentContext } from '@/app/(chat)/context/agent-context'
import { useSendMessage } from './hooks/use-send-message'

export function MessageComposer() {
    const { agentId } = useAgentContext();
    const { mutate: sendMessage, isPending } = useSendMessage();

    const parentRef = useRef<HTMLDivElement>(null);

    const form = useForm({
        defaultValues: { message: '' },
    });
    async function onSubmit(data: { message: string }) {
        if (isPending) {
            return;
        }
        form.reset();
        sendMessage({ agentId, text: data.message })
    }

    return (
        <div className="flex justify-end flex-col min-w-0">
            <div className="relative flex mx-auto pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
                <div ref={parentRef}
                    tabIndex={-1}
                    className="flex-col focus-within:ring-1 focus-within:ring-ring block w-full bg-muted rounded-md border border-input px-3 py-2 shadow-sm disabled:cursor-not-allowed disabled:opacity-50 max-h-[calc(75dvh)]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                className="flex w-full bg-transparent resize-none overflow-hidden placeholder:text-muted-foreground md:text-sm text-base border-none shadow-none ring-0 hover:border-none focus:border-none !focus-visible:outline-none focus:ring-0 !focus-visible:ring-0"
                                                placeholder="Send a message..."
                                                {...field}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        form.handleSubmit(onSubmit)();
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button type="submit" className="w-1 h-8 rounded-full flex items-center justify-center" disabled={isPending}>
                                    <ArrowUpIcon width={14} height={16} />
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
