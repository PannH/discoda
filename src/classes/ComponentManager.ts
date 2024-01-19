import type Button from './Button';
import type SelectMenu from './SelectMenu';
import type TextInput from './TextInput';
import type Embed from './Embed';
import type Modal from './Modal';
import { Collection } from 'discord.js';
import { join, relative } from 'path';
import { readdirSync } from 'fs';

/**
 * Represents a component manager
 */
export default class ComponentManager<ComponentType extends Button | SelectMenu | TextInput | Embed | Modal> extends Collection<string, ComponentType['data']> {

   /**
    * Creates a new component manager
    * 
    * @param _path The path to the components directory
    * @example
    * ```ts
    * const buttons = new ComponentManager<Button>('src/components/buttons');
    * ```
    */
   constructor(private _path: string) {

      super();

      if (_path)
         this.reload();

   }

   /**
    * Reloads the components from the directory
    * 
    * @throws {Error} If no path was provided in client options
    */
   public reload(): void {

      if (!this._path)
         throw new Error('No path was provided in client options');

      for (const fileName of readdirSync(this._path)) {

         const absolutePath = join(__dirname, '..', '..', join(this._path, fileName));
         const relativePath = relative(__dirname, absolutePath);

         const component: ComponentType = require(relativePath).default;

         this.set(component.name, component.data);

      }

   }

}