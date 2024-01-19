import type { AutocompleteInteraction } from 'discord.js';
import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The callback for the {@link Autocomplete}
 */
export type AutocompleteCallback = (client: Client, interaction: AutocompleteInteraction) => Awaitable<unknown>;