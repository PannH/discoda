import { Interaction } from 'discord.js';
import type Autocomplete from './Autocomplete';
import type Client from './Client';
import Handler from './Handler';

/**
 * Represents an autocomplete handler
 */
export default class AutocompleteHandler extends Handler<Autocomplete> {

   /**
    * Creates a new autocomplete handler
    * 
    * @param client The client
    * @param path The path to the autocompletes directory
    * @example
    * ```ts
    * const autocompletes = new AutocompleteHandler(client, 'src/autocompletes');
    * ```
    */
   constructor(client: Client, path: string) {

      super(path);

      client.addListener('interactionCreate', (interaction: Interaction) => {

         if (!interaction.isAutocomplete())
            return;

         const autocomplete = this.find(({ commandName }) => commandName === interaction.commandName);
         
         autocomplete.callback.call(null, client, interaction);

      });

   }

}