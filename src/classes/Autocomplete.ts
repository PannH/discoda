import type { AutocompleteCallback } from '../types/AutocompleteCallback';

/**
 * Represents an autocomplete
 */
export default class Autocomplete {

   /**
    * Creates a new autocomplete
    * 
    * @param commandName The name of the command that triggers the autocomplete
    * @param callback The callback of the autocomplete 
    * @example
    * ```ts
    * module.exports.default = new Autocomplete('ping', (client, interaction) => {
    *    // ...
    * });
    * ```
    */
   constructor(public commandName: string, public callback: AutocompleteCallback) {}

}