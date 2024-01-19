import type { LocalizationMap, PermissionResolvable } from 'discord.js';

/**
 * The context menu command data
 */
export default interface ContextMenuCommandData {
   /**
    * The name
    */
   name: string;
   /**
    * The name localizations
    */
   nameLocalizations?: LocalizationMap;
   /**
    * The default member permissions
    */
   defaultMemberPermissions?: PermissionResolvable | null;
   /**
    * Whether or not the command is enabled in DMs
    */
   dmPermission?: boolean;
}