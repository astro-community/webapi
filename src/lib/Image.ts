import { INTERNALS_FOR } from './utils'

export function Image() {
	// @ts-ignore
	Object.assign(INTERNALS_FOR(this), { name: 'img', ownerDocument: globalThis.document })
}

Image.prototype = HTMLImageElement.prototype
