import { Message, PermissionFlags } from "discord.js";
import Client from "../client/client";

declare type CommandCategory = 'Default';

export interface CommandContext {
    client: Client;
    message: Message;
    command: string;
    args: string[];
}

export interface Run {
    (context: CommandContext);
}

export default interface Command {
    name: string;
    permission?: keyof PermissionFlags;
    category?: CommandCategory;
    aliases?: string[];
    run: Run;
}