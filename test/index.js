import { polyfill } from '../mod.js'

polyfill(globalThis)

const tests = [
	{
		name: 'Globals exist',
		test() {
			const types = {
				AbortController: typeof AbortController,
				AbortSignal: typeof AbortSignal,
				Blob: typeof Blob,
				ByteLengthQueuingStrategy: typeof ByteLengthQueuingStrategy,
				CountQueuingStrategy: typeof CountQueuingStrategy,
				CustomEvent: typeof CustomEvent,
				DOMException: typeof DOMException,
				Event: typeof Event,
				EventTarget: typeof EventTarget,
				File: typeof File,
				FormData: typeof FormData,
				Headers: typeof Headers,
				ReadableByteStreamController: typeof ReadableByteStreamController,
				ReadableStream: typeof ReadableStream,
				ReadableStreamBYOBReader: typeof ReadableStreamBYOBReader,
				ReadableStreamBYOBRequest: typeof ReadableStreamBYOBRequest,
				ReadableStreamDefaultController: typeof ReadableStreamDefaultController,
				ReadableStreamDefaultReader: typeof ReadableStreamDefaultReader,
				Request: typeof Request,
				Response: typeof Response,
				TransformStream: typeof TransformStream,
				WritableStream: typeof WritableStream,
				WritableStreamDefaultController: typeof WritableStreamDefaultController,
				WritableStreamDefaultWriter: typeof WritableStreamDefaultWriter,
				cancelAnimationFrame: typeof cancelAnimationFrame,
				clearTimeout: typeof clearTimeout,
				fetch: typeof fetch,
				requestAnimationFrame: typeof requestAnimationFrame,
				setTimeout: typeof setTimeout,
			}
	
			for (const name in types) {
				if (types[name] === 'function') continue
				else throw new Error(`Missing "${name}" type.`)
			}
		},
	},
	{
		name: 'Constructs an Event',
		test() {
			const e = new Event('test')

			if (e.type !== 'test') throw new Error('Event was wrong type')
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

			if (!pass) throw new Error('Event did not dispatch')
		},
	},
]

console.log(`Testing Node ${process.version}`)

for (const test of tests) {
	try {
		console.log(`- ${test.name}`)

		test.test()
	} catch (error) {
		console.error(error)

		process.exit(1)
	}
}

console.log('')
console.log('Pass!')

process.exit(0)
