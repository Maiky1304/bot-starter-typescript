import Command from "../interfaces/command";

export const command: Command = {
    name: 'test',
    aliases: ['test2'],
    run: ({ message }) => {
        message.reply({
            content: 'This works!'
        }).catch(err => console.error(err));
    }
}