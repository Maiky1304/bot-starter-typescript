import { Client as DiscordClient, Collection, Intents } from "discord.js";
import { glob } from "glob-promise";
import ConfigJson from '../../config.json';
import Command from "../interfaces/command";
import Config from "../interfaces/config";
import { Event } from "../interfaces/event";

export default class Client extends DiscordClient {
    public config: Config = ConfigJson;
    public commands: Collection<string, Command> = new Collection();

    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES
            ]
        })
        this.#bindEvents();
        this.#bindCommands();
    }

    #bindEvents() {
        glob('**/events/**/{*.ts,*.js}', (err, matches) => {
            matches.map(file => require(`../../${file}`))
            .map(script => script.event).forEach(
                (event: Event) => this[event.type || 'on'](event.name, event.run.bind(null, this))
            );
        });
    }

    #bindCommands() {
        glob('**/commands/**/{*.ts,*.js}', (err, matches) => {
            matches.map(file => require(`../../${file}`))
            .map(script => script.command).forEach(
                (command: Command) => {
                    this.commands.set(command.name, command);
                    command.aliases.forEach(alias => {
                        this.commands.set(alias, command);
                    })
                }
            )
        })
    }

    launch() {
        this.login(this.config.token);
    }

}