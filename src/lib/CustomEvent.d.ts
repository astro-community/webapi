import type { Event } from './Event'

interface CustomEvent<TEventType extends string = string, TEventInit extends EventInit = EventInit> extends Event {}

export declare var CustomEvent: CustomEvent

interface EventInit {
	bubbles?: boolean
	cancelable?: boolean
	composed?: boolean
}
