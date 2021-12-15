const exclusionsForHTMLElement = [ 'HTMLElement', 'HTMLDivElement', 'HTMLHeadElement', 'HTMLHtmlElement', 'HTMLImageElement', 'HTMLStyleElement', 'HTMLTemplateElement', 'HTMLUnknownElement' ]
const exclusionsForElement = [ 'Element', ...exclusionsForHTMLElement ] as const
const exclusionsForDocument = [ 'Document', 'HTMLDocument' ] as const
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
