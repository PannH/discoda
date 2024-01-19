import type { TextInputBuilder, TextInputComponentData } from 'discord.js';

/**
 * The data for the {@link TextInput} (builder or raw)
 */
export type TextInputData = TextInputBuilder | Omit<TextInputComponentData, 'type'>;