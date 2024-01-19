import type { EmbedData } from '../types/EmbedData';
import { EmbedBuilder } from 'discord.js';

/**
 * Represents an embed component
 */
export default class Embed {

   /**
    * 
    * @param name The name of the embed
    * @param data The data of the embed (builder or raw)
    * @example
    * ```ts
    * module.exports.default = new Embed('welcome', {
    *    color: 0x5865f2,
    *    title: 'Welcome',
    *    description: 'Greetings! Welcome to my server.'
    * });
    * ```
    * @example
    * ```ts
    * module.exports.default = new Embed(
    *    'welcome',
    *    new EmbedBuilder()
    *       .setColor(0x5865f2)
    *       .setTitle('Welcome')
    *       .setDescription('Greetings! Welcome to my server.')
    * );
    * ```
    */
   constructor(public name: string, public data: EmbedData) {

      if (!(data instanceof EmbedBuilder))
         this.data = new EmbedBuilder(data);

   }

}