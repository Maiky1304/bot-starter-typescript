import { Event } from "../interfaces/event";

export const event: Event = {
    name: 'ready',
    type: 'on',
    run: (client) => {
        console.log(`Bot launched (${client.user.tag})`)
    }
}