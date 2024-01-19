import type { UserContextMenuCommandInteraction } from 'discord.js';
import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The predicate for the {@link UserContextMenuCommandMiddleware}
 */
export type UserContextMenuCommandMiddlewarePredicate = (client: Client, interaction: UserContextMenuCommandInteraction) => Awaitable<boolean>;