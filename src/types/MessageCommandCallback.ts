import type { Message } from 'discord.js';
import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The callback for the {@link MessageCommand}
 */
export type MessageCommandCallback = (client: Client, message: Message, args: string[]) => Awaitable<unknown>;
