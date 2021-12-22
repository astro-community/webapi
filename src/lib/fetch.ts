import { default as nodeFetch, Headers, Request, Response } from 'node-fetch/src/index.js'
import * as fs from 'fs'

export { Headers, Request, Response }

export const fetch = (resource: string | URL | Request, init?: Partial<FetchInit>): Promise<Response> => {
	const currentURL = new URL(
		(
			String(Error().stack).split(import.meta.url).slice(1).join(import.meta.url).match(/(?<= \()[\w-]+:[^:)]+/) || [import.meta.url]
		)[0]
	)

	const resourceURL = new URL(String(resource), currentURL.href)

	if (resourceURL.protocol.toLowerCase() === 'file:') {
		const stream = fs.createReadStream(resourceURL, { encoding: 'utf-8' })

		return new Response(stream);
	} else {
		return nodeFetch(resource, init)
	}
}

type USVString = ({} & string)

interface FetchInit {
	body: Blob | BufferSource | FormData | URLSearchParams | ReadableStream | USVString
	cache: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'
	credentials: 'omit' | 'same-origin' | 'include'
	headers: Headers | Record<string, string>
	method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH' | USVString
	mode: 'cors' | 'no-cors' | 'same-origin' | USVString
	redirect: 'follow' | 'manual' | 'error'
	referrer: USVString
	referrerPolicy: 'no-referrer' | 'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' | 'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'
	integrity: USVString
	keepalive: boolean
	signal: AbortSignal
}
