import type ClientOptions from '../interfaces/ClientOptions';
import { type BaseFetchOptions, type Channel, type FetchChannelOptions, type FetchGuildOptions, type Guild, type User, type UserResolvable, type GuildEmoji, Client as DJSClient, ComponentType } from 'discord.js';
import EventHandler from './EventHandler';
import SlashCommandHandler from './SlashCommandHandler';
import AutocompleteHandler from './AutocompleteHandler';
import MessageCommandHandler from './MessageCommandHandler';
import UserContextMenuCommandHandler from './UserContextMenuCommandHandler';
import MessageContextMenuCommandHandler from './MessageContextMenuCommandHandler';
import ComponentManager from './ComponentManager';
import Button from './Button';
import SelectMenu from './SelectMenu';
import TextInput from './TextInput';
import Embed from './Embed';
import Modal from './Modal';

/**
 * Represents a Discord.js client
 */
export default class Client extends DJSClient {

   // handlers
   /**
    * The event handler
    */
   public events: EventHandler;
   /**
    * The slash command handler
    */
   public slashCommands: SlashCommandHandler;
   /**
    * The autocomplete handler
    */
   public autocompletes: AutocompleteHandler;
   /**
    * The message command handler
    */
   public messageCommands: MessageCommandHandler;
   /**
    * The user context menu command handler
    */
   public userContextMenuCommands: UserContextMenuCommandHandler;
   /**
    * The message context menu command handler
    */
   public messageContextMenuCommands: MessageContextMenuCommandHandler;

   // component managers
   /**
    * The button component manager
    */
   public buttons: ComponentManager<Button>;
   /**
    * The select menu component manager
    */
   public selectMenus: ComponentManager<SelectMenu>;
   /**
    * The text input component manager
    */
   public textInputs: ComponentManager<TextInput>;
   /**
    * The embed component manager
    */
   public embeds: ComponentManager<Embed>;
   /**
    * The modal component manager
    */
   public modals: ComponentManager<Modal>;

   // misc
   /**
    * The prefix for message commands
    * 
    * @default `'!'`
    */
   public prefix: string;
   /**
    * The default cooldown for the commands
    * 
    * @default `0`
    */
   public defaultCooldownSeconds: number;
   /**
    * The IDs of the bot owners
    * 
    * @default `[]`
    */
   public ownerIds: string[];
   /**
    * The IDs of the bot's private guilds
    * 
    * @default `[]`
    */
   public privateGuildIds: string[];
   /**
    * A map of guild IDs to prefixes for the message commands
    * 
    * @default `{}`
    * @example
    * ```ts
    * const client = new Client({
    *    // ...
    *    guildPrefixes: {
    *       '1180237364707217409': '?',
    *       '1188147841533739048': '$',
    *       '985223450916450324': '&'
    *    }
    * });
    * ```
    */
   public guildPrefixes: Record<string, string>;

   /**
    * Creates a new Discord.js client
    * 
    * @param options The options for the client
    * @example
    * ```ts
    * const client = new Client({
    *    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
    *    handlerPaths: {
    *       events: 'src/events',
    *       slashCommands: 'src/slashCommands'
    *    }
    * });
    * ```
    */
   constructor(options: ClientOptions) {

      super(options);

      // handlers
      this.events = new EventHandler(this, options.handlerPaths?.events);
      this.slashCommands = new SlashCommandHandler(this, options.handlerPaths?.slashCommands);
      this.autocompletes = new AutocompleteHandler(this, options.handlerPaths?.autocompletes);
      this.messageCommands = new MessageCommandHandler(this, options.handlerPaths?.messageCommands);
      this.userContextMenuCommands = new UserContextMenuCommandHandler(this, options.handlerPaths?.userContextMenuCommands);
      this.messageContextMenuCommands = new MessageContextMenuCommandHandler(this, options.handlerPaths?.messageContextMenuCommands);

      // component managers
      this.buttons = new ComponentManager<Button>(options.componentPaths?.buttons);
      this.selectMenus = new ComponentManager<SelectMenu>(options.componentPaths?.selectMenus);
      this.textInputs = new ComponentManager<TextInput>(options.componentPaths?.textInputs);
      this.embeds = new ComponentManager<Embed>(options.componentPaths?.embeds);
      this.modals = new ComponentManager<Modal>(options.componentPaths?.modals);

      // misc
      this.prefix = options.prefix ?? '!';
      this.defaultCooldownSeconds = options.defaultCooldownSeconds ?? 0;
      this.ownerIds = options.ownerIds ?? [];
      this.privateGuildIds = options.privateGuildIds ?? [];
      this.guildPrefixes = options.guildPrefixes ?? {};

   }

   /**
    * Registers all commands
    * 
    * @example
    * ```ts
    * client.registerCommands()
    *    .then(() => console.log(`Registered all commands`))
    *    .catch(() => console.error(`Failed to register commands`);
    * ```
    */
   public async registerCommands(): Promise<void> {

      if (!this.application)
         throw new Error('Client must be ready to register commands');

      const publicCommandsData = [
         ...this.slashCommands
            .filter(({ options }) => !options.privateGuildOnly)
            .map(({ options }) => options.data),
         ...this.userContextMenuCommands.map(({ options }) => options.data),
         ...this.messageContextMenuCommands.map(({ options }) => options.data)
      ];
      const privateCommandsData = this.slashCommands
         .filter(({ options }) => options.privateGuildOnly)
         .map(({ options }) => options.data);

      await this.application.commands.set(publicCommandsData as any);

      for (const guildId of this.privateGuildIds) {

         const guild = await this.guilds.fetch(guildId);

         await guild.commands.set(privateCommandsData);

      }

   }

   /**
    * Fetches a channel, shortcut for `client.channels.fetch(...)`
    * 
    * @param id The ID of the channel to fetch
    * @param options The options for fetching the channel
    * @returns The fetched channel
    */
   public async fetchChannel(id: string, options?: FetchChannelOptions): Promise<Channel | null> {

      return await this.channels.fetch(id, options);

   }

   /**
    * Fetches a guild, shortcut for `client.guilds.fetch(...)`
    * 
    * @param options The options for fetching the guild
    * @returns The fetched guild
    */
   public async fetchGuild(options: string | FetchGuildOptions): Promise<Guild> {

      return await this.guilds.fetch(options);

   }

   /**
    * Fetches a user, shortcut for `client.users.fetch(...)`
    * 
    * @param user The user to fetch
    * @param options The options for fetching the user
    * @returns The fetched user
    */
   public async fetchUser(user: UserResolvable, options?: BaseFetchOptions): Promise<User> {

      return this.users.fetch(user, options);

   }

}