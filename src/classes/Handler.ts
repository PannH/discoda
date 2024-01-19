import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join, relative } from 'path';
import generateSnowflake from '../utils/generateSnowflake';

/**
 * Represents a handler
 */
export default class Handler<ItemType> extends Collection<string, ItemType> {

   /**
    * Creates a new handler
    * 
    * @param _path The path to the directory
    */
   constructor(protected _path: string) {

      super();

      if (_path)
         this.reload();

   }

   /**
    * Reloads the handler items from the directory
    * 
    * @throws {Error} if no path was provided in client options
    */
   public reload(): void {

      if (!this._path)
         throw new Error('No path was provided in client options');

      for (const fileName of readdirSync(this._path)) {

         const absolutePath = join(__dirname, '..', '..', join(this._path, fileName));
         const relativePath = relative(__dirname, absolutePath);

         const item: ItemType = require(relativePath).default;
         const itemId = generateSnowflake();

         this.set(itemId, item);

      }

   }

}