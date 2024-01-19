import type { ClientEvents } from 'discord.js';

/**
 * The name of an event
 */
export type EventName = keyof ClientEvents | 'commandCooldown';