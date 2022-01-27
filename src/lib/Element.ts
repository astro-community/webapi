import { internalsOf, setStringTag } from './utils'

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

	attachShadow(init: Partial<ShadowRootInit>) {
		if (arguments.length < 1) throw new TypeError(`Failed to execute 'attachShadow' on 'Element': 1 argument required, but only 0 present.`)

		if (init !== Object(init)) throw new TypeError(`Failed to execute 'attachShadow' on 'Element': The provided value is not of type 'ShadowRootInit'.`)

		if (init.mode !== 'open' && init.mode !== 'closed') throw new TypeError(`Failed to execute 'attachShadow' on 'Element': Failed to read the 'mode' property from 'ShadowRootInit': The provided value '${init.mode}' is not a valid enum value of type ShadowRootMode.`)

		const internals = internalsOf<ElementInternals>(this, 'Element', 'attachShadow')

		if (internals.shadowRoot) throw new Error('The operation is not supported.')

		internals.shadowInit = internals.shadowInit || {
			mode: init.mode,
			delegatesFocus: Boolean(init.delegatesFocus),
		}

		internals.shadowRoot = internals.shadowRoot || (/^open$/.test(internals.shadowInit.mode as string) ? Object.setPrototypeOf(new EventTarget(), ShadowRoot.prototype) as ShadowRoot : null)

		return internals.shadowRoot
	}

	get innerHTML(): string {
		internalsOf<ElementInternals>(this, 'Element', 'innerHTML')

		return ''
	}

	set innerHTML(value) {
		internalsOf<ElementInternals>(this, 'Element', 'innerHTML')

		void value
	}

	get shadowRoot(): ShadowRoot | null {
		const internals = internalsOf<ElementInternals>(this, 'Element', 'shadowRoot')

		return Object(internals.shadowInit).mode === 'open' ? internals.shadowRoot : null
	}

	get localName(): string {
		return internalsOf<ElementInternals>(this, 'Element', 'localName').localName
	}

	get nodeName(): string {
		return internalsOf<ElementInternals>(this, 'Element', 'nodeName').localName.toUpperCase()
	}

	get tagName(): string {
		return internalsOf<ElementInternals>(this, 'Element', 'tagName').localName.toUpperCase()
	}
}

export class HTMLElement extends Element {}

export class HTMLBodyElement extends HTMLElement {}

export class HTMLDivElement extends HTMLElement {}

export class HTMLHeadElement extends HTMLElement {}

export class HTMLHtmlElement extends HTMLElement {}

export class HTMLSpanElement extends HTMLElement {}

export class HTMLStyleElement extends HTMLElement {}

export class HTMLTemplateElement extends HTMLElement {}

export class HTMLUnknownElement extends HTMLElement {}

setStringTag(Element)
setStringTag(HTMLElement)
setStringTag(HTMLBodyElement)
setStringTag(HTMLDivElement)
setStringTag(HTMLHeadElement)
setStringTag(HTMLHtmlElement)
setStringTag(HTMLSpanElement)
setStringTag(HTMLStyleElement)
setStringTag(HTMLTemplateElement)
setStringTag(HTMLUnknownElement)

export interface ElementInternals {
	localName: string
	shadowRoot: ShadowRoot | null
	shadowInit: ShadowRootInit
}

export interface ShadowRootInit {
	mode: 'open' | 'closed'
	delegatesFocus: boolean
}