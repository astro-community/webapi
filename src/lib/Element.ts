import { INTERNALS } from './utils'

export class Element extends Node {
	hasAttribute(name: string): boolean {
		void name

		return false
	}

	getAttribute(name: string): string | null {
		void name

		return null
	}

	setAttribute(name: string, value: string): void {
		void name
		void value
	}

	removeAttribute(name: string): void {
		void name
	}

	attachShadow(init: { mode?: string }) {
		const internals: ElementInternals = INTERNALS.get(this)

		if (!internals) throw new TypeError('Can only call Element.attachShadow on instances of Element')

		if (internals.shadowRoot) throw new Error('The operation is not supported.')

		internals.shadowInit = internals.shadowInit || Object(init)
		internals.shadowRoot = internals.shadowRoot || (/^open$/.test(internals.shadowInit.mode as string) ? Object.setPrototypeOf(new EventTarget(), ShadowRoot.prototype) as ShadowRoot : null)

		return internals.shadowRoot
	}

	get innerHTML(): string {
		return ''
	}

	set innerHTML(value) {
		void value
	}

	get shadowRoot(): ShadowRoot | null {
		const internals: ElementInternals = INTERNALS.get(this)

		if (!internals) throw new TypeError('The Element.shadowRoot getter can only be used on instances of Element')

		internals.shadowInit = internals.shadowInit || {}
		internals.shadowRoot = internals.shadowRoot || null

		const shadowRootOrNull = /^open$/.test(internals.shadowInit.mode as string) ? internals.shadowRoot : null

		return shadowRootOrNull
	}

	get localName(): string {
		const internals: ElementInternals = INTERNALS.get(this)

		if (!internals) throw new TypeError('The Element.localName getter can only be used on instances of Element')

		return internals.localName
	}

	get nodeName(): string {
		const internals: ElementInternals = INTERNALS.get(this)

		if (!internals) throw new TypeError('The Element.nodeName getter can only be used on instances of Element')

		return internals.localName.toUpperCase()
	}

	get tagName(): string {
		const internals: ElementInternals = INTERNALS.get(this)

		if (!internals) throw new TypeError('The Element.tagName getter can only be used on instances of Element')

		return internals.localName.toUpperCase()
	}
}

export class HTMLElement extends Element {}

export class HTMLBodyElement extends HTMLElement {}

export class HTMLDivElement extends HTMLElement {}

export class HTMLHeadElement extends HTMLElement {}

export class HTMLHtmlElement extends HTMLElement {}

export class HTMLImageElement extends HTMLElement {}

export class HTMLSpanElement extends HTMLElement {}

export class HTMLStyleElement extends HTMLElement {}

export class HTMLTemplateElement extends HTMLElement {}

export class HTMLUnknownElement extends HTMLElement {}

export interface ElementInternals {
	attributes: { [name: string]: string }
	localName: string
	shadowRoot: ShadowRoot
	shadowInit: { mode?: string }
}
