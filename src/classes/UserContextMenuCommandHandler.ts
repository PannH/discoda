import type { Interaction, UserContextMenuCommandInteraction } from 'discord.js';
import type Client from './Client';
import type UserContextMenuCommand from './UserContextMenuCommand';
import type CommandAutoDeferralOptions from '../interfaces/CommandAutoDeferralOptions';
import type UserContextMenuCommandMiddleware from '../classes/UserContextMenuCommandMiddleware';
import Handler from './Handler';

/**
 * Represents a user context menu command handler
 */
export default class UserContextMenuCommandHandler extends Handler<UserContextMenuCommand> {

   /**
    * Creates a new user context menu command handler
    * 
    * @param client The client
    * @param path The path to the user context menu commands directory
    * @example
    * ```ts
    * const userContextMenuCommands = new UserContextMenuCommandHandler(client, 'src/userContextMenuCommands');
    * ```
    */
   constructor(client: Client, path: string) {

      super(path);

      client.addListener('interactionCreate', async (interaction: Interaction) => {

         if (!interaction.isUserContextMenuCommand())
            return;

         const userContextMenuCommand = this.find(({ options }) => options.data.name === interaction.commandName);

         if (userContextMenuCommand.options.autoDeferral === true || (userContextMenuCommand.options.autoDeferral as CommandAutoDeferralOptions).enabled)
            await interaction.deferReply({
               ephemeral: (userContextMenuCommand.options.autoDeferral as CommandAutoDeferralOptions).ephemeral ?? false
            });

         for (const middleware of userContextMenuCommand.options.middlewares as UserContextMenuCommandMiddleware[]) {

            const isSuccess = await middleware.predicate.call(null, client, interaction);

            if (!isSuccess)
               return middleware.failCallback?.call(null, client, interaction);

         }

         if (userContextMenuCommand.options.cooldownSeconds || client.defaultCooldownSeconds) {

            const cooldownMilliseconds = (userContextMenuCommand.options.cooldownSeconds ?? client.defaultCooldownSeconds) * 1000;

            if (userContextMenuCommand.cooldowns.has(interaction.user.id)) {

               const cooldownTimestamp = userContextMenuCommand.cooldowns.get(interaction.user.id);
               const expirationTimestamp = cooldownTimestamp + cooldownMilliseconds;
               const nowTimestamp = Date.now();

               if (nowTimestamp <= expirationTimestamp) {

                  const remainingMilliseconds = expirationTimestamp - nowTimestamp;

                  return client.emit('commandCooldown', userContextMenuCommand, interaction, remainingMilliseconds);

               }

            } else {

               userContextMenuCommand.cooldowns.set(interaction.user.id, Date.now());

               setTimeout(() => userContextMenuCommand.cooldowns.delete(interaction.user.id), cooldownMilliseconds);

            }

         }

         userContextMenuCommand.callback.call(null, client, interaction);

      });

   }

}