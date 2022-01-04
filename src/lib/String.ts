import { __string_escapeRegExp, __object_toString } from './utils'

export const replaceAll = {
	replaceAll(this: string, searchValue: RegExp | string, replaceValue: string | ((substring: string, ...args: any[]) => string)) {
		return __object_toString(searchValue) === '[object RegExp]'
			? this.replace(searchValue as RegExp, replaceValue as string)
		: this.replace(new RegExp(__string_escapeRegExp(searchValue as string), 'g'), replaceValue as string)
	}
}.replaceAll

export const initString = (target: any, exclude: Set<string>) => {
	if (exclude.has('String') || exclude.has('replaceAll')) return

	const Class = target.String || globalThis.String

	Object.defineProperty(Class.prototype, 'replaceAll', {
		value: replaceAll,
		writable: true,
		enumerable: false,
		configurable: true
	})
}
