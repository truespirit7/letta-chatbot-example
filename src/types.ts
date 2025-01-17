export enum UserType {
    USER
}

export enum MessageType {
    TOOL_CALL_MESSAGE = "tool_call_message",
    USER_MESSAGE = "user_message"
}

export interface AppMessage {
    id: string;
    date: number;
    message: string;
    messageType: MessageType;
    toolCall?: { arguments: string };
}

