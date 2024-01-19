import type { ModalData } from '../types/ModalData';
import { ModalBuilder } from 'discord.js';

/**
 * Represents a modal component
 */
export default class Modal {

   /**
    * Creates a new modal component
    * 
    * @param name The name of the modal
    * @param data The data of the modal (builder or raw)
    * @example
    * ```ts
    * module.exports.default = new Modal('number_input', {
    *    customId: 'number_input',
    *    title: 'Number Input',
    *    components: [
    *       {
    *          type: ComponentType.ActionRow,
    *          components: [
    *             {
    *                customId: 'number',
    *                type: ComponentType.TextInput,
    *                style: TextInputStyle.Short,
    *                placeholder: 'Enter a number',
    *                label: 'Number',
    *                required: true
    *             }
    *          ]
    *       }
    *    ]
    * });
    * ```
    * @example
    * ```ts
    * module.exports.default = new Modal(
    *    'number_input',
    *    new ModalBuilder()
    *       .setCustomId('number_input')
    *       .setTitle('Number Input')
    *       .setComponents(
    *          new ActionRowBuilder()
    *             .setComponents(
    *                new TextInputBuilder()
    *                   .setCustomId('number')
    *                   .setStyle(TextInputStyle.Short)
    *                   .setPlaceholder('Enter a number')
    *                   .setLabel('Number')
    *                   .setRequired(true)
    *             )
    *       )
    * );
    * ```
    */
   constructor(public name: string, public data: ModalData) {

      if (!(data instanceof ModalBuilder))
         this.data = new ModalBuilder(data as any);

   }

}