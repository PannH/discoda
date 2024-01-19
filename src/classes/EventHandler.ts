import type Event from './Event';
import type Client from './Client';
import Handler from './Handler';

/**
 * Represents an event handler
 */
export default class EventHandler extends Handler<Event> {

   /**
    * Creates a new event handler
    * 
    * @param client The client
    * @param path The path to the events directory
    * @example
    * ```ts
    * const events = new EventHandler(client, 'src/events');
    * ```
    */
   constructor(client: Client, path: string) {

      super(path);

      for (const event of this.values()) {

         client[event.options.triggerOnce ? 'once' : 'on'](event.options.name as string, (...args) => {

            for (const middleware of event.options.middlewares) {

               const isSuccess = middleware.predicate.call(null, client, ...args);

               if (!isSuccess)
                  return middleware.failCallback.call(null, client, ...args);

            }

            event.callback.call(null, client, ...args);

         });

      }

   }

}