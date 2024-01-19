import type { ButtonBuilder, ButtonComponentData } from 'discord.js';

/**
 * The data for the {@link Button} (builder or raw)
 */
export type ButtonData = ButtonBuilder | Omit<ButtonComponentData, 'type'>;