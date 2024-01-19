import type { ChatInputApplicationCommandData, SlashCommandBuilder } from 'discord.js';
import type  CommandAutoDeferralOptions from './CommandAutoDeferralOptions';
import type SlashCommandMiddleware from '../classes/SlashCommandMiddleware';

/**
 * The options for the {@link SlashCommand}
 */
export default interface SlashCommandOptions {
   /**
    * The data (builder or raw)
    */
   data: ChatInputApplicationCommandData | SlashCommandBuilder;
   /**
    * The middlewares
    * 
    * @default `[]`
    */
   middlewares?: SlashCommandMiddleware[];
   /**
    * The auto deferral options
    * 
    * @default `false`
    */
   autoDeferral?: boolean | CommandAutoDeferralOptions;
   /**
    * The cooldown in seconds
    * 
    * @default `null`
    */
   cooldownSeconds?: number | null;
   /**
    * Whether or not the command is only usable in the private guilds ({@link ClientOptions.privateGuildIds})
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