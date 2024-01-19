import type { ChatInputCommandInteraction } from 'discord.js';
import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The predicate for the {@link SlashCommandMiddleware}
 */
export type SlashCommandMiddlewarePredicate = (client: Client, interaction: ChatInputCommandInteraction) => Awaitable<boolean>;