import { INTERNALS_FOR } from './utils'

export class Document extends Node {
	createElement(name: string) {
		name = String(name).toUpperCase()

		const internals = INTERNALS_FOR<ElementRegistryInternals>(this.defaultView.customElements)

		const TypeOfHTMLElement = internals.constructorByName.get(name) || HTMLUnknownElement

		const element: HTMLElement = Object.create(TypeOfHTMLElement.prototype)

		Object.assign(INTERNALS_FOR(element), { name, ownerDocument: this })

		return element
	}

	get adoptedStyleSheets(): StyleSheet[] {
		return []
	}

	get body() {
		const internals = INTERNALS_FOR<DocumentInternals>(this)

		return internals.body || null
	}

	get defaultView() {
		const internals = INTERNALS_FOR<DocumentInternals>(this)

		return internals.defaultView || null
	}

	get documentElement() {
		const internals = INTERNALS_FOR<DocumentInternals>(this)

		return internals.documentElement || null
	}

	get head() {
		const internals = INTERNALS_FOR<DocumentInternals>(this)

		return internals.head || null
	}

	get styleSheets(): StyleSheet[] {
		return []
	}
}

export class HTMLDocument extends Document {}

interface DocumentInternals {
	body: HTMLElement;
	defaultView: WindowInternals;
	documentElement: HTMLHtmlElement;
	head: HTMLHeadElement;
}

interface ElementRegistryInternals {
	constructorByName: Map<string, typeof HTMLElement>;
	nameByConstructor: Map<typeof HTMLElement, string>;
}

interface WindowInternals {
	customElements: CustomElementRegistry;
	document: HTMLDocument;
	location: URL;
}