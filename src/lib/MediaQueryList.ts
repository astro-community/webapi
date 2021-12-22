import { INTERNALS, internalsOf } from './utils'

export class MediaQueryList extends EventTarget {
	get matches(): boolean {
		return internalsOf(this, 'MediaQueryList', 'matches').matches
	}

	get media(): string {
		return internalsOf(this, 'MediaQueryList', 'media').media
	}
}

export const initMediaQueryList = (target: Target, exclude: Set<string>) => {
	if (exclude.has('matchMedia')) return

	target.matchMedia = function matchMedia(media: string) {
		const mql = Object.setPrototypeOf(new EventTarget(), MediaQueryList.prototype) as MediaQueryList

		INTERNALS.set(mql, {
			matches: false,
			media,
		})

		return mql
	}
}

interface Target extends Record<any, any> {
	matchMedia: {
		(media: string): MediaQueryList
	}
}
