import { TextInputBuilder } from 'discord.js';
import type { TextInputData } from '../types/TextInputData';

/**
 * Represents a text input component
 */
export default class TextInput {

   /**
    * Creates a new text input
    * 
    * @param name The name of the text input
    * @param data The data of the text input (builder or raw)
    * @example
    * ```ts
    * module.exports.default = new TextInput('username', {
    *    customId: 'username',
    *    label: 'Username',
    *    placeholder: 'Enter your username...',
    *    style: TextInputStyle.Short,
    *    maxLength: 32,
    *    required: true
    * });
    * ```
    * @example
    * ```ts
    * module.exports.default = new TextInput(
    *    'username',
    *    new TextInputBuilder()
    *       .setCustomId('username')
    *       .setLabel('Username')
    *       .setPlaceholder('Enter your username...')
    *       .setStyle(TextInputStyle.Short)
    *       .setMaxLength(32)
    *       .setRequired(true)
    * );
    * ```
    */
   constructor(public name: string, public data: TextInputData) {

      if (!(data instanceof TextInputBuilder))
         this.data = new TextInputBuilder(data);

   }

}