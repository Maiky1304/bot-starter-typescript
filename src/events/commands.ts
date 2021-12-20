import { inlineCode } from "@discordjs/builders";
import { Message } from "discord.js";
import { CommandContext } from "../interfaces/command";
import { Event } from "../interfaces/event";

export const event: Event = {
    name: 'messageCreate',
    type: 'on',
    run: (client, message: Message) => {
        const { content, member, reply } = message;

        if (!content.startsWith(client.config.prefix)) {
            return;
        }

        const label: string = content.split(' ')[0].trim().slice(client.config.prefix.length);
        if (!client.commands.has(label)) return;
        const command = client.commands.get(label);

        if (command.permission && !member.permissions.has(command.permission)) {
            // Change this your liking
            reply({ content: '🥲 You\'re missing the permission ' + inlineCode(command.permission) + '.' })
            return;
        }

        const context: CommandContext = {
            client, message,
            command: label,
            args: content.slice(client.config.prefix.length + label.length).trim().split(' ')
        }
        command.run(context);
    }
}