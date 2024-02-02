import { type Message, type BaseGuildTextChannel, ChannelType } from 'discord.js';
import type MessageCommand from './MessageCommand';
import type Client from './Client';
import Handler from './Handler';

/**
 * Represents a message command handler
 */
export default class MessageCommandHandler extends Handler<MessageCommand> {

   /**
    * Creates a new message command handler
    * 
    * @param client The client
    * @param path The path to the message commands directory
    * @example
    * ```ts
    * const messageCommands = new MessageCommandHandler(client, 'src/messageCommands');
    * ```
    */
   constructor(client: Client, path: string) {

      super(path);

      client.addListener('messageCreate', async (message: Message) => {

         const content = message.content.trim();
         const prefix = client.guildPrefixes[message.guild?.id] ?? client.prefix;

         if (!content.startsWith(prefix) || message.author.bot)
            return;
      
         const args = content.split(/ +/gm);
         const commandName = args.shift().slice(prefix.length);
         const messageCommand = this.find(({ options }) => (options.caseSensitive ? options.name === commandName : options.name.toLowerCase() === commandName.toLowerCase()) || (options.caseSensitive ? options.aliases.includes(commandName) : options.aliases.find((alias) => alias.toLowerCase() === commandName.toLowerCase())));

         if (!messageCommand)
            return;

         if (messageCommand.options.ownerOnly && !client.ownerIds.includes(message.author.id))
            return;

         if (messageCommand.options.privateGuildOnly && !client.privateGuildIds.includes(message.guild?.id))
            return;

         const dmChannelTypes = [ChannelType.DM, ChannelType.GroupDM];
         if (!messageCommand.options.dmPermission && dmChannelTypes.includes(message.channel.type))
            return;

         if (messageCommand.options.nsfw && !(message.channel as BaseGuildTextChannel).nsfw)
            return;

         if (!!message.guild && !message.member?.permissions?.has(messageCommand.options.defaultMemberPermissions))
            return;

         for (const middleware of messageCommand.options.middlewares) {

            const isSuccess = await middleware.predicate.call(null, client, message, args);

            if (!isSuccess)
               return middleware.failCallback?.call(null, client, message, args);

         }

         if (messageCommand.options.cooldownSeconds || client.defaultCooldownSeconds) {

            const cooldownMilliseconds = (messageCommand.options.cooldownSeconds ?? client.defaultCooldownSeconds) * 1000;

            if (messageCommand.cooldowns.has(message.author.id)) {
   
               const cooldownTimestamp = messageCommand.cooldowns.get(message.author.id);
               const expirationTimestamp = cooldownTimestamp + cooldownMilliseconds;
               const nowTimestamp = Date.now();
   
               if (nowTimestamp <= expirationTimestamp) {

                  const remainingMilliseconds = expirationTimestamp - nowTimestamp;

                  return client.emit('commandCooldown', messageCommand, message, remainingMilliseconds);

               }
   
            } else {
               
               messageCommand.cooldowns.set(message.author.id, Date.now());

               setTimeout(() => messageCommand.cooldowns.delete(message.author.id), cooldownMilliseconds);

            }

         }

         messageCommand.callback.call(null, client, message, args);

      });

   }

}