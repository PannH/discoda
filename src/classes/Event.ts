import type EventOptions from '../interfaces/EventOptions';
import type { EventCallback } from '../types/EventCallback';

/**
 * Represents an event
 */
export default class Event {

   /**
    * Creates a new event
    * 
    * @param options The options for the event
    * @param callback The callback for the event
    * @example
    * ```ts
    * module.exports.default = new Event({
    *    name: 'ready',
    *    triggerOnce: true
    * }, (client) => {
    *    console.log(`Client is ready as ${client.user.username}`);
    * });
    * ```
    */
   constructor(public options: EventOptions, public callback: EventCallback) {

      this.options.triggerOnce = options.triggerOnce ?? false;
      this.options.middlewares = options.middlewares ?? [];

   }

}