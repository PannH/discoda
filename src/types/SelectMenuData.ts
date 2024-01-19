import type {
   ChannelSelectMenuBuilder,
   ChannelSelectMenuComponentData,
   MentionableSelectMenuBuilder,
   MentionableSelectMenuComponentData,
   RoleSelectMenuBuilder,
   RoleSelectMenuComponentData,
   StringSelectMenuBuilder,
   StringSelectMenuComponentData,
   UserSelectMenuBuilder,
   UserSelectMenuComponentData
} from 'discord.js';

/**
 * The data for the {@link SelectMenu} (builder or raw)
 */
export type SelectMenuData = 
   RoleSelectMenuBuilder |
   UserSelectMenuBuilder |
   StringSelectMenuBuilder |
   ChannelSelectMenuBuilder |
   MentionableSelectMenuBuilder |
   RoleSelectMenuComponentData |
   UserSelectMenuComponentData |
   StringSelectMenuComponentData |
   ChannelSelectMenuComponentData |
   MentionableSelectMenuComponentData;