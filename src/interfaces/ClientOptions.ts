import type { ClientOptions as DJSClientOptions } from 'discord.js';

/**
 * The options for the {@link Client}
 */
export default interface ClientOptions extends DJSClientOptions {
   /**
    * The paths for the handlers
    */
   handlerPaths?: {
      /**
       * The path to the events directory
       */
      events?: string;
      /**
       * The path to the slash commands directory
       */
      slashCommands?: string;
      /**
       * The path to the autocompletes directory
       */
      autocompletes?: string;
      /**
       * The path to the message commands directory
       */
      messageCommands?: string;
      /**
       * The path to the user context menu commands directory
       */
      userContextMenuCommands?: string;
      /**
       * The path to the message context menu commands directory
       */
      messageContextMenuCommands?: string;
   },
   /**
    * The paths for the components
    */
   componentPaths?: {
      /**
       * The path to the buttons directory
       */
      buttons?: string;
      /**
       * The path to the select menus directory
       */
      selectMenus?: string;
      /**
       * The path to the text inputs directory
       */
      textInputs?: string;
      /**
       * The path to the embeds directory
       */
      embeds?: string;
      /**
       * The path to the modals directory
       */
      modals?: string;
   }
   /**
    * The prefix for the message commands
    * 
    * @default `'!'`
    */
   prefix?: string;
   /**
    * The default cooldown for the commands
    * 
    * @default `0`
    */
   defaultCooldownSeconds?: number;
   /**
    * The IDs of the owners of the bot
    * 
    * @default `[]`
    */
   ownerIds?: string[];
   /**
    * The IDs of the private guilds of the bot
    * 
    * @default `[]`
    */
   privateGuildIds?: string[];
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
    */
   guildPrefixes?: Record<string, string>;
}