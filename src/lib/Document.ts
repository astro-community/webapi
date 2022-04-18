import * as _ from './utils'
import { Text } from './CharacterData'
import { TreeWalker } from './TreeWalker'

export class Document extends Node {
	createElement(name: string) {
		const internals = _.internalsOf<DocumentInternals>(this, 'Document', 'createElement')

		name = String(name).toLowerCase()

		const TypeOfHTMLElement = internals.constructorByName.get(name) || HTMLUnknownElement

		const element = Object.setPrototypeOf(new EventTarget(), TypeOfHTMLElement.prototype) as HTMLElement

		_.INTERNALS.set(element, <ElementInternals>{
			attributes: {},
			localName: name,
			ownerDocument: this,
			shadowInit: null as unknown as ShadowRootInit,
			shadowRoot: null as unknown as ShadowRoot,
		})

		return element
	}

	createNodeIterator(root: Node, whatToShow: number = NodeFilter.SHOW_ALL, filter?: NodeIteratorInternals['filter']) {
		const target = Object.create(NodeIterator.prototype)

		_.INTERNALS.set(target, { filter, pointerBeforeReferenceNode: false, referenceNode: root, root, whatToShow } as NodeIteratorInternals)

		return target
	}

	createTextNode(data: string) {
		return new Text(data)
	}

	createTreeWalker(root: Node, whatToShow: number = NodeFilter.SHOW_ALL, filter?: NodeFilter, expandEntityReferences?: boolean) {
		const target = Object.create(TreeWalker.prototype)

		_.INTERNALS.set(target, { filter, currentNode: root, root, whatToShow } as TreeWalkerInternals)

		return target
	}

	get adoptedStyleSheets(): StyleSheet[] {
		return []
	}

	get styleSheets(): StyleSheet[] {
		return []
	}

	activeElement!: HTMLElement
	body!: HTMLBodyElement
	documentElement!: HTMLHtmlElement
	head!: HTMLHeadElement
}

export class HTMLDocument extends Document {}

_.assignStringTag(Document)
_.assignStringTag(HTMLDocument)

// initialization
// -----------------------------------------------------------------------------

export const initDocument = (target: any, exclude: Set<string>, pseudo: any) => {
	if (!_.hasOwn(pseudo, 'document')) {
		/** Reference to the HTMLDocument object. */
		const document: HTMLDocument = pseudo.document = pseudo.document || Object.setPrototypeOf(new pseudo.EventTarget, pseudo.HTMLDocument.prototype)

		/** Document internals. */
		const internals = _.internalsTo<DocumentInternals>(document, {
			constructorByName: new Map,
			nameByConstructor: new Map,
		})

		const registerConstructor = (constructor: Function, name: string) => {
			internals.constructorByName.set(name, constructor)
			internals.nameByConstructor.set(constructor, name)

			_.internalsTo<ElementConstructorInternals>(constructor, { document })
		}

		registerConstructor(pseudo.HTMLElement, 'article')
		registerConstructor(pseudo.HTMLElement, 'aside')
		registerConstructor(pseudo.HTMLBodyElement, 'body')
		registerConstructor(pseudo.HTMLCanvasElement, 'canvas')
		registerConstructor(pseudo.HTMLDivElement, 'div')
		registerConstructor(pseudo.HTMLElement, 'footer')
		registerConstructor(pseudo.HTMLHeadElement, 'head')
		registerConstructor(pseudo.HTMLElement, 'header')
		registerConstructor(pseudo.HTMLHtmlElement, 'html')
		registerConstructor(pseudo.HTMLImageElement, 'img')
		registerConstructor(pseudo.HTMLElement, 'main')
		registerConstructor(pseudo.HTMLElement, 'nav')
		registerConstructor(pseudo.HTMLElement, 'section')
		registerConstructor(pseudo.HTMLSpanElement, 'span')
		registerConstructor(pseudo.HTMLStyleElement, 'style')
		
		_.assign(document, {
			body: document.createElement('body'),
			documentElement: document.createElement('html'),
			head: document.createElement('head'),
		})
	}

	if (!exclude.has('document')) target.document = pseudo.document
}

// interfaces
// -----------------------------------------------------------------------------

interface DocumentInternals {
	constructorByName: Map<string, Function>
	nameByConstructor: Map<Function, string>
}

interface ElementInternals {
	attributes: { [name: string]: string },
	localName: string
	ownerDocument: Document
	shadowRoot: ShadowRoot
	shadowInit: ShadowRootInit
}

interface ShadowRootInit extends Record<any, any> {
	mode?: string
}

interface NodeIteratorInternals {
	filter: NodeFilter
	pointerBeforeReferenceNode: boolean
	referenceNode: Node
	root: Node
	whatToShow: number
}

interface TreeWalkerInternals {
	filter: NodeFilter
	currentNode: Node
	root: Node
	whatToShow: number
}

interface ElementConstructorInternals {
	document: Document
}
