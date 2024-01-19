import type { Interaction } from 'discord.js';
import type Client from './Client';
import type CommandAutoDeferralOptions from '../interfaces/CommandAutoDeferralOptions';
import type SlashCommand from './SlashCommand';
import Handler from './Handler';

/**
 * Represents a slash command handler
 */
export default class SlashCommandHandler extends Handler<SlashCommand> {

   /**
    * Creates a new slash command handler
    * 
    * @param client The client
    * @param path The path to the slash commands directory
    * @example
    * ```ts
    * const slashCommands = new SlashCommandHandler(client, 'src/slashCommands');
    * ```
    */
   constructor(client: Client, path: string) {

      super(path);

      if (!client)
         return;

      client.addListener('interactionCreate', async (interaction: Interaction) => {

         if (!interaction.isChatInputCommand())
            return;

         const slashCommand = this.find(({ options }) => options.data.name === interaction.commandName);

         if (slashCommand.options.autoDeferral === true || (slashCommand.options.autoDeferral as CommandAutoDeferralOptions).enabled)
            await interaction.deferReply({
               ephemeral: (slashCommand.options.autoDeferral as CommandAutoDeferralOptions).ephemeral ?? false
            });

         for (const middleware of slashCommand.options.middlewares) {

            const isSuccess = await middleware.predicate.call(null, client, interaction);

            if (!isSuccess)
               return middleware.failCallback?.call(null, client, interaction);

         }

         if (slashCommand.options.cooldownSeconds || client.defaultCooldownSeconds) {

            const cooldownMilliseconds = (slashCommand.options.cooldownSeconds ?? client.defaultCooldownSeconds) * 1000;

            if (slashCommand.cooldowns.has(interaction.user.id)) {

               const cooldownTimestamp = slashCommand.cooldowns.get(interaction.user.id);
               const expirationTimestamp = cooldownTimestamp + cooldownMilliseconds;
               const nowTimestamp = Date.now();

               if (nowTimestamp <= expirationTimestamp) {

                  const remainingMilliseconds = expirationTimestamp - nowTimestamp;

                  return client.emit('commandCooldown', slashCommand, interaction, remainingMilliseconds);

               }

            } else {

               slashCommand.cooldowns.set(interaction.user.id, Date.now());

               setTimeout(() => slashCommand.cooldowns.delete(interaction.user.id), cooldownMilliseconds);

            }

         }
         
         slashCommand.callback.call(null, client, interaction);

      });

   }

}