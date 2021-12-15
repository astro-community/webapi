import { INTERNALS_FOR } from './utils'

export class Element extends Node {
	hasAttribute(name: string) {
		void name

		return false
	}

	getAttribute(name: string) {
		void name

		return null
	}

	setAttribute(name: string, value: string) {
		void name
		void value
	}

	attachShadow(init: { mode?: string }) {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		if (internals.shadowRoot) throw new Error('The operation is not supported.')

		internals.shadowInit = internals.shadowInit || Object(init)
		internals.shadowRoot = internals.shadowRoot || (/^open$/.test(internals.shadowInit.mode as string) ? new ShadowRoot() as ShadowRoot : null)

		return internals.shadowRoot
	}

	get innerHTML() {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		return internals.innerHTML
	}

	set innerHTML(value) {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		internals.innerHTML = String(value)
	}

	get shadowRoot() {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		internals.shadowInit = internals.shadowInit || {}
		internals.shadowRoot = internals.shadowRoot || null

		const shadowRootOrNull = /^open$/.test(internals.shadowInit.mode as string) ? internals.shadowRoot : null

		return shadowRootOrNull
	}

	get nodeName() {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		return internals.name || ''
	}

	get tagName() {
		const internals = INTERNALS_FOR<ElementInternals>(this)

		return internals.name || ''
	}
}

export class HTMLElement extends Element {}

export class HTMLDivElement extends HTMLElement {}

export class HTMLHeadElement extends HTMLElement {}

export class HTMLHtmlElement extends HTMLElement {}

export class HTMLImageElement extends HTMLElement {}

export class HTMLStyleElement extends HTMLElement {}

export class HTMLTemplateElement extends HTMLElement {}

export class HTMLUnknownElement extends HTMLElement {}

interface ElementInternals {
	name: string;
	innerHTML: string;
	shadowRoot: ShadowRoot;
	shadowInit: { mode?: string }
}
