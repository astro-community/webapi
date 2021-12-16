import { assert, test } from './_setup.js'
import { polyfill } from '../mod.js'

test(() => {
	polyfill(globalThis)

	return [
		{
			name: 'Globals exist',
			test() {
				const webAPIs = [ 'AbortController', 'AbortSignal', 'Blob', 'ByteLengthQueuingStrategy', 'CSSStyleSheet', 'CountQueuingStrategy', 'CustomElementRegistry', 'CustomEvent', 'DOMException', 'Document', 'DocumentFragment', 'Element', 'Event', 'EventTarget', 'File', 'FormData', 'HTMLDocument', 'HTMLElement', 'HTMLDivElement', 'HTMLHeadElement', 'HTMLHtmlElement', 'HTMLImageElement', 'HTMLStyleElement', 'HTMLTemplateElement', 'HTMLUnknownElement', 'Headers', 'IntersectionObserver', 'Image', 'MediaQueryList', 'MutationObserver', 'Node', 'ReadableByteStreamController', 'ReadableStream', 'ReadableStreamBYOBReader', 'ReadableStreamBYOBRequest', 'ReadableStreamDefaultController', 'ReadableStreamDefaultReader', 'Request', 'Response', 'ShadowRoot', 'StyleSheet', 'TransformStream', 'WritableStream', 'WritableStreamDefaultController', 'WritableStreamDefaultWriter', 'Window', 'cancelAnimationFrame', 'cancelIdleCallback', 'clearTimeout', 'fetch', 'requestAnimationFrame', 'requestIdleCallback', 'setTimeout' ]
	
				for (const name of webAPIs) {
					assert.equal(typeof globalThis[name], 'function')
				}
			},
		},
		{
			name: 'Constructs an Event',
			test() {
				const e = new Event('test')
	
				assert.equal(e.type, 'test')
			},
		},
		{
			name: 'Constructs an EventTarget',
			test() {
				const t = new EventTarget()
			},
		},
		{
			name: 'Dispatches an Event on an EventTarget',
			test() {
				const t = new EventTarget()
	
				let pass = false
	
				t.addEventListener('test', (event) => {
					pass = true
				})
	
				const e = new Event('test')
	
				t.dispatchEvent(e)
	
				assert.equal(pass, true)
			},
		},
		{
			name: 'Classes extend as expected',
			test() {
				assert.equal(HTMLElement.prototype instanceof Element, true)
				assert.equal(Element.prototype instanceof Node, true)
				assert.equal(Node.prototype instanceof EventTarget, true)
			},
		},
		{
			name: 'DOM Methods have no effect',
			test() {
				const element = document.createElement('div')

				assert.equal(element.innerHTML, '')
				element.innerHTML = 'frozen'
				assert.equal(element.innerHTML, '')

				assert.equal(element.textContent, '')
				element.textContent = 'frozen'
				assert.equal(element.textContent, '')
			},
		},
		{
			name: 'globalThis.window === globalThis',
			test() {
				assert.equal(globalThis.window, globalThis)
			},
		},
	]
})
