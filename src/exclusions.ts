const exclusionsForHTMLElement = [ 'CustomElementsRegistry', 'HTMLElement', 'HTMLBodyElement', 'HTMLCanvasElement', 'HTMLDivElement', 'HTMLHeadElement', 'HTMLHtmlElement', 'HTMLImageElement', 'HTMLStyleElement', 'HTMLTemplateElement', 'HTMLUnknownElement', 'Image' ]
const exclusionsForElement = [ 'Element', ...exclusionsForHTMLElement ] as const
const exclusionsForDocument = [ 'CustomElementsRegistry', 'Document', 'HTMLDocument', 'document', 'customElements' ] as const
const exclusionsForNode = [ 'Node', 'DocumentFragment', 'ShadowRoot', ...exclusionsForDocument, ...exclusionsForElement ] as const
const exclusionsForEventTarget = [ 'Event', 'CustomEvent', 'EventTarget', 'AbortSignal', 'MediaQueryList', 'Window', ...exclusionsForNode ] as const
const exclusionsForEvent = [ 'Event', 'CustomEvent', 'EventTarget', 'AbortSignal', 'MediaQueryList', 'Window', ...exclusionsForNode ] as const

export const exclusions = {
	'StyleSheet+': [ 'StyleSheet', 'CSSStyleSheet' ],
	'Blob+': [ 'Blob', 'File' ],
	'Document+': exclusionsForDocument,
	'Element+': exclusionsForElement,
	'Event+': exclusionsForEvent,
	'EventTarget+': exclusionsForEventTarget,
	'HTMLElement+': exclusionsForHTMLElement,
	'Node+': exclusionsForNode,
}
