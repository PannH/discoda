import type { PermissionResolvable } from 'discord.js';
import type MessageCommandMiddleware from '../classes/MessageCommandMiddleware';

/**
 * The options for the {@link MessageCommand}
 */
export default interface MessageCommandOptions {
   /**
    * The name
    */
   name: string;
   /**
    * The name aliases
    * 
    * @default `[]`
    */
   aliases?: string[];
   /**
    * Whether or not the command is only usable in NSFW channels
    * 
    * @default `false`
    */
   nsfw?: boolean;
   /**
    * Whether or not the command name is case sensitive
    * 
    * @default `false`
    */
   caseSensitive?: boolean;
   /**
    * Whether or not the command is enabled in DMs
    * 
    * @default `true`
    */
   dmPermission?: boolean;
   /**
    * The default member permissions
    * 
    * @default `null`
    */
   defaultMemberPermissions?: PermissionResolvable | null;
   /**
    * The middlewares
    * 
    * @default `[]`
    */
   middlewares?: MessageCommandMiddleware[];
   /**
    * The cooldown in seconds
    * 
    * @default `null`
    */
   cooldownSeconds?: number | null;
   /**
    * Whether or not the command is only usable by the owners ({@link ClientOptions.ownerIds})
    * 
    * @default `false`
    */
   ownerOnly?: boolean;
   /**
    * Whether or not the command is only usable in private guilds ({@link ClientOptions.privateGuildIds})
    * 
    * @default `false`
    */
   privateGuildOnly?: boolean;
   /**
    * The metadata
    * 
    * @default `{}`
    */
   metadata?: Record<string, unknown>;
}