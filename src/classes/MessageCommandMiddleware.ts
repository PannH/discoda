import type { MessageCommandCallback } from '../types/MessageCommandCallback';
import type { MessageCommandMiddlewarePredicate } from '../types/MessageCommandMiddlewarePredicate';

/**
 * Represents a message command middleware
 */
export default class MessageCommandMiddleware {

   /**
    * 
    * @param predicate The predicate of the middleware
    * @example
    * ```ts
    * // This means that the message command will only be ran if the user is in a voice channel
    * const IsInVoiceChannel = new MessageCommandMiddleware(
    *    (client, message, args) => message.member.voice.channel !== null,
    *    (client, message, args) => message.reply('You must be in a voice channel to use this command')
    * );
    *    
    * module.exports.default = new MessageCommand({
    *    // ...
    *    middlewares: [IsInVoiceChannel]
    * }, (...) => { ... })
    * ```
    */
   constructor(public predicate: MessageCommandMiddlewarePredicate, public failCallback?: MessageCommandCallback) {}

}