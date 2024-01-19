import type ContextMenuCommandOptions from '../interfaces/ContextMenuCommandOptions';
import type { UserContextMenuCommandCallback } from '../types/UserContextMenuCommandCallback';
import type { CooldownCollection } from '../types/CooldownCollection';
import { ApplicationCommandType, Collection } from 'discord.js';

/**
 * Represents a user context menu command
 */
export default class UserContextMenuCommand {

   /**
    * The cooldowns for the command
    */
   public cooldowns: CooldownCollection = new Collection();

   /**
    * Creates a new user context menu command
    * 
    * @param options The options for the command
    * @param callback The callback for the command
    * @example
    * ```ts
    * module.exports.default = new UserContextMenuCommand({
    *    data: {
    *       name: 'Get ID'
    *    },
    *    cooldownSeconds: 2
    * }, async (client, interaction) => {
    *    await interaction.reply(`ID of ${interaction.targetUser}: ${interaction.targetUser.id}`);
    * });
    * ```
    */
   constructor(public options: ContextMenuCommandOptions, public callback: UserContextMenuCommandCallback) {

      (options.data as any).type = ApplicationCommandType.User;
      options.autoDeferral = options.autoDeferral ?? false;
      options.cooldownSeconds = options.cooldownSeconds ?? null;
      options.middlewares = options.middlewares ?? [];

   }

}