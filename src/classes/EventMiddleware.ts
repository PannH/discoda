import type { EventCallback } from '../types/EventCallback';
import type { EventMiddlewarePredicate } from '../types/EventMiddlewarePredicate';

/**
 * Represents an event middleware
 */
export default class EventMiddleware {

   /**
    * Creates a new event middleware
    * 
    * @param predicate The predicate of the middleware
    * @param failCallback The callback to call if the predicate fails
    * @example
    * ```ts
    * // This means that the event will only be triggered if the client is ready
    * const IsClientReady = new EventMiddleware(
    *    (client) => client.isReady(),
    *    (client) => console.log('Event not called since client is not ready')
    * );
    * 
    * module.exports.default = new Event({
    *    // ...
    *    middlewares: [IsClientReady]
    * }, (...) => { ... });
    * ```
    */
   constructor(public predicate: EventMiddlewarePredicate, public failCallback?: EventCallback) {}

}