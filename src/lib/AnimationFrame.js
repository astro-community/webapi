// @ts-check

import { setTimeout as nodeSetTimeout, clearTimeout as nodeClearTimeout } from 'node:timers'
import { __function_bind, __performance_now } from './utils.js'

const INTERNAL = { tick: 0, pool: new Map }

/** @type {<TArgs extends any[], TFunc extends (...args: TArgs) => any>(callback: TFunc) => number} */
export function requestAnimationFrame(callback) {
	if (!INTERNAL.pool.size) {
		nodeSetTimeout(() => {
			const next = __performance_now()

			for (const func of INTERNAL.pool.values()) {
				func(next)
			}

			INTERNAL.pool.clear()
		}, 16)
	}

	const func = __function_bind(callback, undefined)
	const tick = ++INTERNAL.tick

	INTERNAL.pool.set(tick, func)

	return tick
}

/** @type {{ (timeoutId: number): void }} */
export function cancelAnimationFrame(requestId) {
	const timeout = INTERNAL.pool.get(requestId)

	if (timeout) {
		nodeClearTimeout(timeout)

		INTERNAL.pool.delete(requestId)
	}
}
