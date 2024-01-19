import type { ContextMenuCommandBuilder } from 'discord.js';
import type ContextMenuCommandData from './ContextMenuCommandData';
import type CommandAutoDeferralOptions from './CommandAutoDeferralOptions';
import type UserContextMenuCommandMiddleware from '../classes/UserContextMenuCommandMiddleware';
import type MessageContextMenuCommandMiddleware from '../classes/MessageContextMenuCommandMiddleware';

/**
 * The options for the context menu command
 */
export default interface ContextMenuCommandOptions {
   /**
    * The data
    */
   data: ContextMenuCommandData | Omit<ContextMenuCommandBuilder, 'type' | 'setType'>;
   /**
    * The command auto deferral options
    * 
    * @default `false`
    */
   autoDeferral?: boolean | CommandAutoDeferralOptions;
   /**
    * The cooldown in seconds
    * 
    * @default `null`
    */
   cooldownSeconds?: number | null;
   /**
    * The middlewares
    * 
    * @default `[]`
    */
   middlewares?: (UserContextMenuCommandMiddleware | MessageContextMenuCommandMiddleware)[];
}