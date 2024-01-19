import type { Interaction } from 'discord.js';
import type Client from './Client';
import type MessageContextMenuCommand from './MessageContextMenuCommand';
import type CommandAutoDeferralOptions from '../interfaces/CommandAutoDeferralOptions';
import type MessageContextMenuCommandMiddleware from '../classes/MessageContextMenuCommandMiddleware';
import Handler from './Handler';

/**
 * Represents a message context menu command handler
 */
export default class MessageContextMenuCommandHandler extends Handler<MessageContextMenuCommand> {

   /**
    * Creates a new message context menu command handler
    * 
    * @param client The client
    * @param path The path to the message context menu command directory
    * @example
    * ```ts
    * const messageContextMenuCommands = new MessageContextMenuCommandHandler(client, 'src/messageContextMenuCommands');
    * ```
    */
   constructor(client: Client, path: string) {

      super(path);

      client.addListener('interactionCreate', async (interaction: Interaction) => {

         if (!interaction.isMessageContextMenuCommand())
            return;

         const messageContextMenuCommand = this.find(({ options }) => options.data.name === interaction.commandName);

         if (messageContextMenuCommand.options.autoDeferral === true || (messageContextMenuCommand.options.autoDeferral as CommandAutoDeferralOptions).enabled)
            await interaction.deferReply({
               ephemeral: (messageContextMenuCommand.options.autoDeferral as CommandAutoDeferralOptions).ephemeral ?? false
            });

         for (const middleware of messageContextMenuCommand.options.middlewares as MessageContextMenuCommandMiddleware[]) {

            const isSuccess = await middleware.predicate.call(null, client, interaction);

            if (!isSuccess)
               return middleware.failCallback.call(null, client, interaction);

         }

         if (messageContextMenuCommand.options.cooldownSeconds || client.defaultCooldownSeconds) {

            const cooldownMilliseconds = (messageContextMenuCommand.options.cooldownSeconds ?? client.defaultCooldownSeconds) * 1000;

            if (messageContextMenuCommand.cooldowns.has(interaction.user.id)) {

               const cooldownTimestamp = messageContextMenuCommand.cooldowns.get(interaction.user.id);
               const expirationTimestamp = cooldownTimestamp + cooldownMilliseconds;
               const nowTimestamp = Date.now();

               if (nowTimestamp <= expirationTimestamp) {

                  const remainingMilliseconds = expirationTimestamp - nowTimestamp;

                  return client.emit('commandCooldown', messageContextMenuCommand, interaction, remainingMilliseconds);

               }

            } else {

               messageContextMenuCommand.cooldowns.set(interaction.user.id, Date.now());

               setTimeout(() => messageContextMenuCommand.cooldowns.delete(interaction.user.id), cooldownMilliseconds);

            }

         }

         messageContextMenuCommand.callback.call(null, client, interaction);

      });

   }

}