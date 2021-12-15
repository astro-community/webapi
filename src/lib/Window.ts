import { INTERNALS_FOR } from './utils'

export class Window extends EventTarget {
	matchMedia(mediaQueryString: string) {
		void mediaQueryString

		const mediaQueryList = Object.create(MediaQueryList.prototype)

		return mediaQueryList
	}

	get customElements() {
		const _internals = INTERNALS_FOR<WindowInternals>(this)

		return _internals.customElements
	}

	get document() {
		const _internals = INTERNALS_FOR<WindowInternals>(this)

		return _internals.document
	}

	get location() {
		const _internals = INTERNALS_FOR<WindowInternals>(this)

		return _internals.location
	}

	get window() {
		return this
	}
}

export interface WindowInternals {
	customElements: CustomElementRegistry;
	document: HTMLDocument;
	location: URL;
}
