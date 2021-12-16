import { INTERNALS } from './utils'
import { HTMLImageElement, ElementInternals } from './Element'

export function Image() {
	// @ts-ignore
	INTERNALS.set(this, {
		attributes: {},
		localName: 'img',
		innerHTML: '',
		shadowRoot: null,
		shadowInit: null,
	} as ElementInternals)
}

Image.prototype = HTMLImageElement.prototype
