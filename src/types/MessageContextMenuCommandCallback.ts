import type { MessageContextMenuCommandInteraction } from 'discord.js';
import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The callback for the {@link MessageContextMenuCommand}
 */
export type MessageContextMenuCommandCallback = (client: Client, interaction: MessageContextMenuCommandInteraction) => Awaitable<unknown>;