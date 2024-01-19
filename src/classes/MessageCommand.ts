import type MessageCommandOptions from '../interfaces/MessageCommandOptions';
import type { CooldownCollection } from '../types/CooldownCollection';
import type { MessageCommandCallback } from '../types/MessageCommandCallback';
import { Collection } from 'discord.js';

/**
 * Represents a message command
 */
export default class MessageCommand {

   /**
    * The cooldowns of the command
    */
   public cooldowns: CooldownCollection = new Collection();

   /**
    * Creates a new message command
    * 
    * @param options The options for the command
    * @param callback The callback for the command
    * @example
    * ```ts
    * module.exports.default = new MessageCommand({
    *    name: 'ping',
    *    aliases: ['latency', 'p'],
    *    cooldownSeconds: 2
    * }, async (client, message, args) => {
    *    await message.reply(`🏓 Pong! ${client.ws.ping}ms`);
    * });
    * ```
    */
   constructor(public options: MessageCommandOptions, public callback: MessageCommandCallback) {

      options.aliases = options.aliases ?? [];
      options.caseSensitive = options.caseSensitive ?? false;
      options.defaultMemberPermissions = options.defaultMemberPermissions ?? null;
      options.dmPermission = options.dmPermission ?? true;
      options.nsfw = options.nsfw ?? false;
      options.middlewares = options.middlewares ?? [];
      options.cooldownSeconds = options.cooldownSeconds ?? null;
      options.ownerOnly = options.ownerOnly ?? false;
      options.metadata = options.metadata ?? {};

   }

}