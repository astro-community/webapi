import { performance } from 'node:perf_hooks'

export const __date_now = Date.now

export const __function_bind = Function.bind.bind(Function.call as unknown as any) as <TArgs extends any[], TFunc extends (...args: TArgs) => any>(callback: TFunc, thisArg: unknown, ...args: TArgs) => TFunc

export const __function_call = Function.call.bind(Function.call as unknown as any) as <TArgs extends any, TFunc extends (...args: TArgs[]) => any>(callback: TFunc, thisArg: unknown, ...args: TArgs[]) => ReturnType<TFunc>

export const __object_create = Object.create as <T extends any = any>(value: T) => any extends T ? Record<any, any> : T

export const __object_hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty)

export const __object_toString = Function.call.bind(Object.prototype.toString)

export const __object_isPrototypeOf = Function.call.bind(Object.prototype.isPrototypeOf)

export const __performance_now = performance.now as () => number

export const __string_escapeRegExp = (value: string) => value.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&')


/** Returns any kind of path as a posix path. */
export const __toPosixPath = (pathname: any) => String(
	pathname == null ? '' : pathname
)
// convert slashes
.replace(/\\+/g, '/')
// prefix a slash to drive letters
.replace(/^(?=[A-Za-z]:\/)/, '/')
// encode path characters
.replace(/%/g, '%25').replace(/\n/g, '%0A').replace(/\r/g, '%0D').replace(/\t/g, '%09')

export const INTERNALS = new WeakMap()

export const internalsOf = <T extends object>(target: T | object, className: string, propName: string): T => {
	const internals: T = INTERNALS.get(target)

	if (!internals) throw new TypeError(`${className}.${propName} can only be used on instances of ${className}`)

	return internals
}
