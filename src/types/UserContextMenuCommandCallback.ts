import type { UserContextMenuCommandInteraction } from 'discord.js';
import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The callback for the {@link UserContextMenuCommand}
 */
export type UserContextMenuCommandCallback = (client: Client, interaction: UserContextMenuCommandInteraction) => Awaitable<unknown>;