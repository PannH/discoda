import type { ButtonData } from '../types/ButtonData';
import { ButtonBuilder } from 'discord.js';

/**
 * Represents a button component
 */
export default class Button {

   /**
    * Creates a new button component
    * 
    * @param name The name of the button
    * @param data The data of the button (builder or raw)
    * @example
    * ```ts
    * module.exports.default = new Button('ban_member', {
    *    customId: 'ban_member',
    *    label: 'Ban Member',
    *    style: ButtonStyle.Danger,
    *    emoji: '🔨'
    * });
    * ```
    * @example
    * ```ts
    * module.exports.default = new Button(
    *    'ban_member',
    *    new ButtonBuilder()
    *       .setCustomId('ban_member')
    *       .setLabel('Ban Member')
    *       .setStyle(ButtonStyle.Danger)
    *       .setEmoji('🔨')
    * );
    * ```
    */
   constructor(public name: string, public data: ButtonData) {

      if (!(data instanceof ButtonBuilder))
         this.data = new ButtonBuilder(data as any);

   }

}