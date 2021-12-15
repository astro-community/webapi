import { INTERNALS_FOR } from './utils'

export class Node extends EventTarget {
	append(...nodesOrDOMStrings: NodeOrString[]) {
		void nodesOrDOMStrings
	}

	appendChild(childNode: Node) {
		return childNode
	}

	after(...nodesOrDOMStrings: NodeOrString[]) {
		void nodesOrDOMStrings
	}

	before(...nodesOrDOMStrings: NodeOrString[]) {
		void nodesOrDOMStrings
	}

	prepend(...nodesOrDOMStrings: NodeOrString[]) {
		void nodesOrDOMStrings
	}

	replaceChild(newChild: Node, oldChild: Node) {
		void newChild

		return oldChild
	}

	removeChild(childNode: Node) {
		return childNode
	}

	get attributes() {
		return {}
	}

	get childNodes(): Node[] {
		return []
	}

	get children(): Element[] {
		return []
	}

	get ownerDocument() {
		const internals = INTERNALS_FOR<NodeInternals>(this)

		internals.ownerDocument = internals.ownerDocument || null

		return internals.ownerDocument
	}

	get textContent() {
		return ''
	}
}

export class DocumentFragment extends Node {}

export class ShadowRoot extends DocumentFragment {
	get innerHTML() {
		return ''
	}
}

type NodeOrString = string | Node

interface NodeInternals {
	ownerDocument: Document;
}
