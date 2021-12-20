import { ClientEvents } from "discord.js";
import Client from "../client/client";

type EventType = 'on' | 'once';

interface Run {
    (client: Client, ...args: any)
}

export interface Event {
    name: keyof ClientEvents;
    type?: EventType;
    run: Run;
}