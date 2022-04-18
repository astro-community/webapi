import * as _ from './utils'

export class Element extends Node {
	constructor() {
		super()

		if (_.INTERNALS.has(new.target)) {
			const constructorInternals = _.internalsOf<ElementConstructorInternals>(new.target, 'Element', 'ownerDocument')
			const documentInternals = _.INTERNALS.get(constructorInternals.document) as DocumentInternals

			_.INTERNALS.set(this, <ElementInternals>{
				attributes: {},
				localName: documentInternals.nameByConstructor.get(new.target) || '',
				ownerDocument: constructorInternals.document,
				shadowInit: null as unknown as ShadowRootInit,
				shadowRoot: null as unknown as ShadowRoot,
			})
		}
	}

	hasAttribute(name: string): boolean {
		void name

		return false
	}

	getAttribute(name: string): string | null {
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

		const internals = _.internalsOf<ElementInternals>(this, 'Element', 'attachShadow')

		if (internals.shadowRoot) throw new Error('The operation is not supported.')

		internals.shadowInit = internals.shadowInit || {
			mode: init.mode,
			delegatesFocus: Boolean(init.delegatesFocus),
		}

		internals.shadowRoot = internals.shadowRoot || (/^open$/.test(internals.shadowInit.mode) ? Object.setPrototypeOf(new EventTarget(), ShadowRoot.prototype) as ShadowRoot : null)

		return internals.shadowRoot
	}

	get assignedSlot(): HTMLSlotElement | null {
		return null
	}

	get innerHTML(): string {
		_.internalsOf<ElementInternals>(this, 'Element', 'innerHTML')

		return ''
	}

	set innerHTML(value) {
		_.internalsOf<ElementInternals>(this, 'Element', 'innerHTML')

		void value
	}

	get ownerDocument(): Document | null {
		const internals = _.internalsOf<ElementInternals>(this, 'Element', 'ownerDocument')

		return internals.ownerDocument
	}

	get shadowRoot(): ShadowRoot | null {
		const internals = _.internalsOf<ElementInternals>(this, 'Element', 'shadowRoot')

		return Object(internals.shadowInit).mode === 'open' ? internals.shadowRoot : null
	}

	get localName(): string {
		return _.internalsOf<ElementInternals>(this, 'Element', 'localName').localName
	}

	get nodeName(): string {
		return _.internalsOf<ElementInternals>(this, 'Element', 'nodeName').localName.toUpperCase()
	}

	get tagName(): string {
		return _.internalsOf<ElementInternals>(this, 'Element', 'tagName').localName.toUpperCase()
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

_.assignStringTag(Element)
_.assignStringTag(HTMLElement)
_.assignStringTag(HTMLBodyElement)
_.assignStringTag(HTMLDivElement)
_.assignStringTag(HTMLHeadElement)
_.assignStringTag(HTMLHtmlElement)
_.assignStringTag(HTMLSpanElement)
_.assignStringTag(HTMLStyleElement)
_.assignStringTag(HTMLTemplateElement)
_.assignStringTag(HTMLUnknownElement)

// interfaces
// -----------------------------------------------------------------------------

interface ElementConstructorInternals {
	document: Document
}

interface ElementInternals {
	attributes: { [name: string]: string }
	localName: string
	ownerDocument: Document
	shadowInit: ShadowRootInit | void
	shadowRoot: ShadowRoot | null
}

interface ShadowRootInit {
	mode: 'open' | 'closed'
	delegatesFocus: boolean
}

interface DocumentInternals {
	activeElement: HTMLElement,
	body: HTMLBodyElement
	documentElement: HTMLHtmlElement
	head: HTMLHeadElement

	constructorByName: Map<string, Function>
	nameByConstructor: Map<Function, string>
}
