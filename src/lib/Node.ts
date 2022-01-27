import { setStringTag } from './utils'

export class Node extends EventTarget {
	constructor() {
		throw new TypeError('Illegal constructor')

		super()
	}

	append(...nodesOrDOMStrings: NodeOrString[]): void {
		void nodesOrDOMStrings
	}

	appendChild(childNode: Node): Node {
		return childNode
	}

	after(...nodesOrDOMStrings: NodeOrString[]): void {
		void nodesOrDOMStrings
	}

	before(...nodesOrDOMStrings: NodeOrString[]): void {
		void nodesOrDOMStrings
	}

	prepend(...nodesOrDOMStrings: NodeOrString[]): void {
		void nodesOrDOMStrings
	}

	replaceChild(newChild: Node, oldChild: Node): Node {
		void newChild

		return oldChild
	}

	removeChild(childNode: Node): Node {
		return childNode
	}

	get attributes(): object {
		return {}
	}

	get childNodes(): Node[] {
		return []
	}

	get children(): Element[] {
		return []
	}

	get ownerDocument(): Node | null {
		return null
	}

	get nodeValue(): string {
		return ''
	}

	set nodeValue(value: string) {
		void value
	}

	get textContent(): string {
		return ''
	}

	set textContent(value: string) {
		void value
	}

	get previousElementSibling(): Node | null {
		return null
	}

	get nextElementSibling(): Node | null {
		return null
	}

	[Symbol.for('nodejs.util.inspect.custom')](depth: number, options: Record<string, any>) {
		return `${this.constructor.name}`;
	}
}

export class DocumentFragment extends Node {}

export class ShadowRoot extends DocumentFragment {
	get innerHTML() {
		return ''
	}

	set innerHTML(value: string) {
		void value
	}
}

setStringTag(Node)
setStringTag(DocumentFragment)
setStringTag(ShadowRoot)

type NodeOrString = string | Node
