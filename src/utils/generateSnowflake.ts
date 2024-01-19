import { SnowflakeUtil } from 'discord.js';

/**
 * Generate a Discord snowflake
 * 
 * @returns A snowflake
 */
export default function generateSnowflake(): string {
   return SnowflakeUtil.generate().toString();
}