import type Client from '../classes/Client';
import type { Awaitable } from './Awaitable';

/**
 * The callback for the {@link Event}
 */
export type EventCallback = (client: Client, ...args: any[]) => Awaitable<void>;