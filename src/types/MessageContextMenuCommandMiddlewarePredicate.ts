import type { MessageContextMenuCommandInteraction } from 'discord.js';
import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The predicate for the {@link MessageContextMenuCommandMiddleware}
 */
export type MessageContextMenuCommandMiddlewarePredicate = (client: Client, interaction: MessageContextMenuCommandInteraction) => Awaitable<boolean>;