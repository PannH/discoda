import type { Message } from 'discord.js';
import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The predicate for the {@link MessageCommandMiddleware}
 */
export type MessageCommandMiddlewarePredicate = (client: Client, message: Message, args: string[]) => Awaitable<boolean>;