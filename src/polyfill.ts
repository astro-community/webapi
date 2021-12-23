import {
	AbortController,
	AbortSignal,
	Blob,
	ByteLengthQueuingStrategy,
	CharacterData,
	Comment,
	CountQueuingStrategy,
	CSSStyleSheet,
	CustomElementRegistry,
	CustomEvent,
	DOMException,
	Document,
	DocumentFragment,
	Element,
	Event,
	EventTarget,
	File,
	FormData,
	HTMLDocument,
	HTMLElement,
	HTMLBodyElement,
	HTMLCanvasElement,
	HTMLDivElement,
	HTMLHeadElement,
	HTMLHtmlElement,
	HTMLImageElement,
	HTMLSpanElement,
	HTMLStyleElement,
	HTMLTemplateElement,
	HTMLUnknownElement,
	Headers,
	IntersectionObserver,
	Image,
	MediaQueryList,
	MutationObserver,
	Node,
	ReadableByteStreamController,
	ReadableStream,
	ReadableStreamBYOBReader,
	ReadableStreamBYOBRequest,
	ReadableStreamDefaultController,
	ReadableStreamDefaultReader,
	Request,
	ResizeObserver,
	Response,
	ShadowRoot,
	StyleSheet,
	Text,
	TransformStream,
	WritableStream,
	WritableStreamDefaultController,
	WritableStreamDefaultWriter,
	Window,

	alert,
	cancelAnimationFrame,
	cancelIdleCallback,
	clearTimeout,
	fetch,
	requestAnimationFrame,
	requestIdleCallback,
	setTimeout,

	initCustomElementRegistry,
	initDocument,
	initMediaQueryList,
	initWindow,
} from './ponyfill'

import { exclusions } from './exclusions'
import { inheritence } from './inheritence'

export {
	AbortController,
	AbortSignal,
	Blob,
	ByteLengthQueuingStrategy,
	CharacterData,
	Comment,
	CountQueuingStrategy,
	CSSStyleSheet,
	CustomElementRegistry,
	CustomEvent,
	DOMException,
	Document,
	DocumentFragment,
	Element,
	Event,
	EventTarget,
	File,
	FormData,
	HTMLDocument,
	HTMLElement,
	HTMLBodyElement,
	HTMLCanvasElement,
	HTMLDivElement,
	HTMLHeadElement,
	HTMLHtmlElement,
	HTMLImageElement,
	HTMLSpanElement,
	HTMLStyleElement,
	HTMLTemplateElement,
	HTMLUnknownElement,
	Headers,
	IntersectionObserver,
	Image,
	MediaQueryList,
	MutationObserver,
	Node,
	ReadableByteStreamController,
	ReadableStream,
	ReadableStreamBYOBReader,
	ReadableStreamBYOBRequest,
	ReadableStreamDefaultController,
	ReadableStreamDefaultReader,
	Request,
	ResizeObserver,
	Response,
	ShadowRoot,
	StyleSheet,
	Text,
	TransformStream,
	WritableStream,
	WritableStreamDefaultController,
	WritableStreamDefaultWriter,
	Window,

	alert,
	cancelAnimationFrame,
	cancelIdleCallback,
	clearTimeout,
	fetch,
	requestAnimationFrame,
	requestIdleCallback,
	setTimeout,
} from './ponyfill.js'

export const polyfill = (target: any, options?: PolyfillOptions) => {
	const webAPIs = {
		AbortController,
		AbortSignal,
		Blob,
		ByteLengthQueuingStrategy,
		CharacterData,
		Comment,
		CountQueuingStrategy,
		CSSStyleSheet,
		CustomElementRegistry,
		CustomEvent,
		Document,
		DocumentFragment,
		DOMException,
		Element,
		Event,
		EventTarget,
		File,
		FormData,
		HTMLDocument,
		HTMLElement,
		HTMLBodyElement,
		HTMLCanvasElement,
		HTMLDivElement,
		HTMLHeadElement,
		HTMLHtmlElement,
		HTMLImageElement,
		HTMLSpanElement,
		HTMLStyleElement,
		HTMLTemplateElement,
		HTMLUnknownElement,
		Headers,
		IntersectionObserver,
		Image,
		MediaQueryList,
		MutationObserver,
		Node,
		ReadableByteStreamController,
		ReadableStream,
		ReadableStreamBYOBReader,
		ReadableStreamBYOBRequest,
		ReadableStreamDefaultController,
		ReadableStreamDefaultReader,
		Request,
		ResizeObserver,
		Response,
		ShadowRoot,
		StyleSheet,
		Text,
		TransformStream,
		WritableStream,
		WritableStreamDefaultController,
		WritableStreamDefaultWriter,
		Window,

		alert,
		cancelAnimationFrame,
		cancelIdleCallback,
		clearTimeout,
		fetch,
		requestAnimationFrame,
		requestIdleCallback,
		setTimeout,
	}

	// initialize exclude options
	const excludeOptions = new Set(
		typeof Object(options).exclude === 'string'
			? String(Object(options).exclude).trim().split(/\s+/)
		: Array.isArray(Object(options).exclude)
			? Object(options).exclude.reduce(
				(array: string[], entry: unknown) => array.splice(array.length, 0, ...(typeof entry === 'string' ? entry.trim().split(/\s+/) : [])) && array,
				[]
			)
		: []
	) as Set<string>

	// expand exclude options using exclusion shorthands
	for (const excludeOption of excludeOptions) {
		if (excludeOption in exclusions) {
			for (const exclusion of exclusions[excludeOption as keyof typeof exclusions]) {
				excludeOptions.add(exclusion)
			}
		}
	}

	// apply each WebAPI
	for (const name of Object.keys(webAPIs)) {
		// skip WebAPIs that are excluded
		if (excludeOptions.has(name)) continue

		// skip WebAPIs that are built-in 
		if (Object.hasOwnProperty.call(target, name)) continue

		// define WebAPIs on the target
		Object.defineProperty(target, name, { configurable: true, enumerable: true, writable: true, value: webAPIs[name as keyof typeof webAPIs] })
	}

	// ensure WebAPIs correctly inherit other WebAPIs
	for (const name of Object.keys(webAPIs)) {
		// skip WebAPIs that are excluded
		if (excludeOptions.has(name)) continue

		// skip WebAPIs that do not extend other WebAPIs
		if (!Object.hasOwnProperty.call(inheritence, name)) continue

		const Class = target[name]
		const Super = target[inheritence[name as keyof typeof inheritence]]

		// skip WebAPIs that are not available
		if (!Class || !Super) continue

		// skip WebAPIs that are already inherited correctly 
		if (Object.getPrototypeOf(Class.prototype) === Super.prototype) continue

		// define WebAPIs inheritence
		Object.setPrototypeOf(Class.prototype, Super.prototype)
	}

	if (!excludeOptions.has('HTMLDocument') && !excludeOptions.has('HTMLElement')) {
		initDocument(target, excludeOptions)

		if (!excludeOptions.has('CustomElementRegistry')) {
			initCustomElementRegistry(target, excludeOptions)
		}
	}

	if (!excludeOptions.has('MediaQueryList')) {
		initMediaQueryList(target, excludeOptions)
	}

	if (!excludeOptions.has('Window')) {
		initWindow(target, excludeOptions)
	}
}

interface PolyfillOptions {
	exclude?: string | string[]
	override?: Record<string, { (...args: any[]): any }>
}
