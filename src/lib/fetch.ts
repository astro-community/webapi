import { default as nodeFetch, Headers, Request, Response } from 'node-fetch/src/index.js'
import * as fs from 'fs'
import { __object_isPrototypeOf, __toPosixPath } from './utils'

export { Headers, Request, Response }

export const fetch = (resource: string | URL | Request, init?: Partial<FetchInit>): Promise<Response> => {
	const resourceURL = new URL(
		__object_isPrototypeOf(Request.prototype, resource)
			? (resource as Request).url
		: __toPosixPath(resource),
		import.meta.url
	)

	if (resourceURL.protocol.toLowerCase() === 'file:') {
		return Promise.resolve(
			new Response(
				fs.createReadStream(resourceURL, { encoding: 'utf-8' })
			)
		)
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
