import { INTERNALS } from './utils'
import { HTMLImageElement } from './HTMLImageElement'

export function Image() {
	// @ts-ignore
	INTERNALS.set(this, {
		attributes: {},
		localName: 'img',
		innerHTML: '',
		shadowRoot: null,
		shadowInit: null,
	})
}

Image.prototype = HTMLImageElement.prototype
