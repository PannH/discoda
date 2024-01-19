import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The predicate for the {@link EventMiddleware}
 */
export type EventMiddlewarePredicate = (client: Client, ...args: any[]) => Awaitable<boolean>;