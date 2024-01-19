import type EventMiddleware from '../classes/EventMiddleware';
import type { EventName } from '../types/EventName';

/**
 * The options for the {@link Event}
 */
export default interface EventOptions {
   /**
    * The name
    */
   name: EventName;
   /**
    * Whether or not the event should be triggered only once
    * 
    * @default `false`
    */
   triggerOnce?: boolean;
   /**
    * The middlewares
    * 
    * @default `[]`
    */
   middlewares?: EventMiddleware[];
}