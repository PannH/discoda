import type { SelectMenuData } from '../types/SelectMenuData';
import { ChannelSelectMenuBuilder, ComponentType, MentionableSelectMenuBuilder, RoleSelectMenuBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from 'discord.js';

/**
 * Represents a select menu component
 */
export default class SelectMenu {

   /**
    * Creates a new select menu component
    * 
    * @param name The name of the select menu
    * @param data The data of the select menu (builder or raw)
    * @example
    * ```ts
    * module.exports.default = new SelectMenu('fruits', {
    *    type: ComponentType.StringSelect,
    *    customId: 'fruits',
    *    placeholder: 'Select a fruit',
    *    options: [
    *       {
    *          label: 'Apple',
    *          emoji: '🍎',
    *          value: 'apple'
    *       },
    *       {
    *          label: 'Banana',
    *          emoji: '🍌',
    *          value: 'banana'
    *       },
    *       {
    *          label: 'Orange',
    *          emoji: '🍊',
    *          value: 'orange'
    *       },
    *       {
    *          label: 'Strawberry',
    *          emoji: '🍓',
    *          value: 'strawberry'
    *       }
    *    ]
    * });
    * ```
    * @example
    * ```ts
    * module.exports.default = new SelectMenu(
    *    'fruits',
    *    new StringSelectMenuBuilder()
    *       .setCustomId('fruits')
    *       .setPlaceholder('Select a fruit')
    *       .setOptions([
    *          {
    *             label: 'Apple',
    *             emoji: '🍎',
    *             value: 'apple'
    *          },
    *          {
    *             label: 'Banana',
    *             emoji: '🍌',
    *             value: 'banana'
    *          },
    *          {
    *             label: 'Orange',
    *             emoji: '🍊',
    *             value: 'orange'
    *          },
    *          {
    *             label: 'Strawberry',
    *             emoji: '🍓',
    *             value: 'strawberry'
    *          }
    *       ])
    * );
    * ```
    */
   constructor(public name: string, public data: SelectMenuData) {

      switch ((data as any).type) {

         case ComponentType.RoleSelect:
            this.data = new RoleSelectMenuBuilder(data as any);
            break;

         case ComponentType.UserSelect:
            this.data = new UserSelectMenuBuilder(data as any);
            break;

         case ComponentType.StringSelect:
            this.data = new StringSelectMenuBuilder(data as any);
            break;

         case ComponentType.ChannelSelect:
            this.data = new ChannelSelectMenuBuilder(data as any);
            break;

         case ComponentType.MentionableSelect:
            this.data = new MentionableSelectMenuBuilder(data as any);
            break;

      }

   }

}