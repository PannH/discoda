import type { ChatInputCommandInteraction } from 'discord.js';
import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The callback for the {@link SlashCommand}
 */
export type SlashCommandCallback = (client: Client, interaction: ChatInputCommandInteraction) => Awaitable<unknown>;
