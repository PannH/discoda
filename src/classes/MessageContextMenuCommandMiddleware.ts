import type { MessageContextMenuCommandCallback } from '../types/MessageContextMenuCommandCallback';
import type { MessageContextMenuCommandMiddlewarePredicate } from '../types/MessageContextMenuCommandMiddlewarePredicate';

/**
 * Represents a message context menu command middleware
 */
export default class MessageContextMenuCommandMiddleware {

   /**
    * Creates a new message context menu command middleware
    * 
    * @param predicate The predicate for the middleware
    * @example
    * ```ts
    * // This means that the message context menu command will only be ran if the target message is from a bot
    * const IsMessageFromBot = new MessageContextMenuCommandMiddleware(
    *    (client, interaction) => interaction.targetMessage.author.bot,
    *    (client, interaction) => interaction.reply('You can only use this command on messages from bots.')
    * );
    * 
    * module.exports.default = new MessageContextMenuCommand({
    *    // ...
    *    middlewares: [IsMessageFromBot]
    * }, (...) => { ... });
    * ```
    */
   constructor(public predicate: MessageContextMenuCommandMiddlewarePredicate, public failCallback?: MessageContextMenuCommandCallback) {}

}