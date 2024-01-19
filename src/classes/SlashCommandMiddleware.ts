import type { SlashCommandCallback } from '../types/SlashCommandCallback';
import type { SlashCommandMiddlewarePredicate } from '../types/SlashCommandMiddlewarePredicate';

// todo: add a failCallback to trigger when the middleware fails
/**
 * Represents a slash command middleware
 */
export default class SlashCommandMiddleware {

   /**
    * Creates a new slash command middleware
    * 
    * @param predicate The predicate for the middleware
    * @example
    * ```ts
    * // This means that the slash command will only be ran if the user is in a voice channel
    * const IsInVoiceChannel = new SlashCommandMiddleware(
    *    (client, interaction) => interaction.member.voice.channel !== null,
    *    (client, interaction) => interaction.reply('You must be in a voice channel to use this command.')
    * );
    * 
    * module.exports.default = new SlashCommand({
    *    // ...
    *    middlewares: [IsInVoiceChannel]
    * }, (...) => { ... });
    * ```
    */
   constructor(public predicate: SlashCommandMiddlewarePredicate, public failCallback?: SlashCommandCallback) {}

}