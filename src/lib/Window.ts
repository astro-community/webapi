import * as _ from './utils'

export class Window extends EventTarget {
	get self(): this {
		return this
	}

	get top(): this {
		return this
	}

	get window(): this {
		return this
	}

	get innerHeight(): number {
		return 0
	}

	get innerWidth(): number {
		return 0
	}

	get scrollX(): number {
		return 0
	}

	get scrollY(): number {
		return 0
	}
}

_.assignStringTag(Window)

export const initWindow = (target: any, exclude: Set<string>) => {
	if (exclude.has('Window') || exclude.has('window')) return

	target.window = target
}

export interface WindowInternals {
	document: null
	location: URL
	window: this
}
