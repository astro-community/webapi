import { internalsOf, setStringTag } from './utils'
import { HTMLElement } from './Element'

export class HTMLImageElement extends HTMLElement {
	get src(): string {
		return internalsOf(this, 'HTMLImageElement', 'src').src
	}

	set src(value) {
		const internals = internalsOf(this, 'HTMLImageElement', 'src')

		internals.src = String(value)
	}
}

setStringTag(HTMLImageElement)
