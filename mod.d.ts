export { AbortController, AbortSignal, Blob, ByteLengthQueuingStrategy, CSSStyleSheet, CountQueuingStrategy, CustomElementRegistry, CustomEvent, DOMException, Document, DocumentFragment, Element, Event, EventTarget, File, FormData, HTMLDocument, HTMLElement, HTMLDivElement, HTMLHeadElement, HTMLHtmlElement, HTMLImageElement, HTMLStyleElement, HTMLTemplateElement, HTMLUnknownElement, Headers, IntersectionObserver, Image, MediaQueryList, MutationObserver, Node, ReadableByteStreamController, ReadableStream, ReadableStreamBYOBReader, ReadableStreamBYOBRequest, ReadableStreamDefaultController, ReadableStreamDefaultReader, Request, Response, ShadowRoot, StyleSheet, TransformStream, WritableStream, WritableStreamDefaultController, WritableStreamDefaultWriter, Window, cancelAnimationFrame, cancelIdleCallback, clearTimeout, fetch, requestAnimationFrame, requestIdleCallback, setTimeout, } from './mod.js';
export declare const polyfill: (target: any, options?: PolyfillOptions | undefined) => void;
interface PolyfillOptions {
    exclude?: string | string[];
    override?: Record<string, {
        (...args: any[]): any;
    }>;
}