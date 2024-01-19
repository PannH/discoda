import type { SlashCommandCallback } from '../types/SlashCommandCallback';
import type SlashCommandOptions from '../interfaces/SlashCommandOptions';
import type { CooldownCollection } from '../types/CooldownCollection';
import { Collection } from 'discord.js';

/**
 * Represents a slash command
 */
export default class SlashCommand {

   /**
    * The cooldowns for this command
    */
   public cooldowns: CooldownCollection = new Collection();

   /**
    * Creates a new slash command
    * 
    * @param options The options for the command
    * @param callback The callback for the command
    * @example 
    * ```ts
    * module.exports.default = new SlashCommand({
    *    data: {
    *       name: 'ping',
    *       description: 'Shows the bot latency'
    *    },
    *    cooldownSeconds: 2
    * }, async (client, interaction) => {
    *    await interaction.reply(`🏓 Pong! ${client.ws.ping}ms`);
    * });
    * ```
    * @example
    * ```ts
    * module.exports.default = new SlashCommand({
    *    data:
    *       new SlashCommandBuilder()
    *          .setName('ping')
    *          .setDescription('Shows the bot latency'),
    *    cooldownSeconds: 2
    * }, async (client, interaction) => {
    *    await interaction.reply(`🏓 Pong! ${client.ws.ping}ms`);
    * });
    * ```
    */
   constructor(public options: SlashCommandOptions, public callback: SlashCommandCallback) {

      options.middlewares = options.middlewares ?? [];
      options.autoDeferral = options.autoDeferral ?? false;
      options.cooldownSeconds = options.cooldownSeconds ?? null;
      options.metadata = options.metadata ?? {};

   }

}