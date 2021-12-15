import {
	AbortController,
	AbortSignal,
	Blob,
	ByteLengthQueuingStrategy,
	CSSStyleSheet,
	CountQueuingStrategy,
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
	HTMLDivElement,
	HTMLHeadElement,
	HTMLHtmlElement,
	HTMLImageElement,
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
	Response,
	ShadowRoot,
	StyleSheet,
	TransformStream,
	WritableStream,
	WritableStreamDefaultController,
	WritableStreamDefaultWriter,
	Window,
	cancelAnimationFrame,
	cancelIdleCallback,
	clearTimeout,
	fetch,
	requestAnimationFrame,
	requestIdleCallback,
	setTimeout,
} from './ponyfill'

import { exclusions } from './exclusions'
import { inheritence } from './inheritence'

export {
	AbortController,
	AbortSignal,
	Blob,
	ByteLengthQueuingStrategy,
	CSSStyleSheet,
	CountQueuingStrategy,
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
	HTMLDivElement,
	HTMLHeadElement,
	HTMLHtmlElement,
	HTMLImageElement,
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
	Response,
	ShadowRoot,
	StyleSheet,
	TransformStream,
	WritableStream,
	WritableStreamDefaultController,
	WritableStreamDefaultWriter,
	Window,
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
		CSSStyleSheet,
		CountQueuingStrategy,
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
		HTMLDivElement,
		HTMLHeadElement,
		HTMLHtmlElement,
		HTMLImageElement,
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
		Response,
		ShadowRoot,
		StyleSheet,
		TransformStream,
		WritableStream,
		WritableStreamDefaultController,
		WritableStreamDefaultWriter,
		Window,
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
		if (Reflect.has(target, name)) continue

		// define WebAPIs on the target
		Object.defineProperty(target, name, { configurable: true, enumerable: true, writable: true, value: webAPIs[name as keyof typeof webAPIs] })
	}

	// ensure WebAPIs correctly inherit other WebAPIs
	for (const name of Object.keys(webAPIs)) {
		// skip WebAPIs that are excluded
		if (excludeOptions.has(name)) continue

		// skip WebAPIs that do not extend other WebAPIs
		if (!Reflect.has(inheritence, name)) continue

		const Class = target[name]
		const Super = target[inheritence[name as keyof typeof inheritence]]

		// skip WebAPIs that are not available
		if (!Class || !Super) continue

		// skip WebAPIs that are already inherited correctly 
		if (Object.getPrototypeOf(Class.prototype) === Super.prototype) continue

		// define WebAPIs inheritence
		Object.setPrototypeOf(Class.prototype, Super.prototype)
	}
}

interface PolyfillOptions {
	exclude?: string | string[]
	override?: Record<string, { (...args: any[]): any }>
}
