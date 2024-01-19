
import type { CooldownCollection } from '../types/CooldownCollection';
import type { MessageContextMenuCommandCallback } from '../types/MessageContextMenuCommandCallback';
import { ApplicationCommandType, Collection } from 'discord.js';
import ContextMenuCommandOptions from '../interfaces/ContextMenuCommandOptions';

/**
 * Represents a message context menu command
 */
export default class MessageContextMenuCommand {

   /**
    * The cooldowns of the command
    */
   public cooldowns: CooldownCollection = new Collection();

   /**
    * Creates a new message context menu command
    * 
    * @param options The options for the command
    * @param callback The callback for the command
    * @example
    * ```ts
    * module.exports.default = new MessageContextMenuCommand({
    *    data: {
    *       name: 'Quote'
    *    },
    *    cooldownSeconds: 2
    * }, async (client, interaction) => {
    *    await interaction.reply(`> ${interaction.targetMessage.content}\n${interaction.targetMessage.author}`);
    * });
    * ```
    */
   constructor(public options: ContextMenuCommandOptions, public callback: MessageContextMenuCommandCallback) {

      (options.data as any).type = ApplicationCommandType.Message;
      options.autoDeferral = options.autoDeferral ?? false;
      options.cooldownSeconds = options.cooldownSeconds ?? null;
      options.middlewares = options.middlewares ?? [];

   }

}