import type { UserContextMenuCommandCallback } from '../types/UserContextMenuCommandCallback';
import type { UserContextMenuCommandMiddlewarePredicate } from '../types/UserContextMenuCommandMiddlewarePredicate';

/**
 * Represents a user context menu command middleware
 */
export default class UserContextMenuCommandMiddleware {

   /**
    * Creates a new user context menu command middleware
    * 
    * @param predicate The predicate for the middleware
    * @example
    * ```ts
    * // This means that the user context menu command will only be ran if the target user is not a bot
    * const IsNotBot = new UserContextMenuCommandMiddleware(
    *    (client, interaction) => !interaction.targetUser.bot,
    *    (client, interaction) => interaction.reply('You cannot use this command on a bot.')
    * );
    * 
    * module.exports.default = new UserContextMenuCommand({
    *    // ...
    *    middlewares: [IsNotBot]
    * }, (...) => { ... });
    */
   constructor(public predicate: UserContextMenuCommandMiddlewarePredicate, public failCallback?: UserContextMenuCommandCallback) {}

}