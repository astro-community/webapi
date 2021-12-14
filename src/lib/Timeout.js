// @ts-check

import { setTimeout as nodeSetTimeout, clearTimeout as nodeClearTimeout } from 'node:timers'
import { __function_bind } from './utils.js'

const INTERNAL = { tick: 0, pool: new Map }

/** @type {<TArgs extends any[], TFunc extends (...args: TArgs) => any>(callback: TFunc, delay?: number, ...args: TArgs) => number} */
export function setTimeout(callback, delay = 0, ...args) {
	const func = __function_bind(callback, globalThis)
	const tick = ++INTERNAL.tick
	const timeout = nodeSetTimeout(func, delay, ...args)

	INTERNAL.pool.set(tick, timeout)

	return tick
}

/** @type {{ (timeoutId: number): void }} */
export function clearTimeout(timeoutId) {
	const timeout = INTERNAL.pool.get(timeoutId)

	if (timeout) {
		nodeClearTimeout(timeout)

		INTERNAL.pool.delete(timeoutId)
	}
}
