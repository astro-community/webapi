import { INTERNALS } from './utils'

export class MediaQueryList extends EventTarget {
	get matches(): boolean {
		const internals: MediaQueryListInternals = INTERNALS.get(this)

		if (!internals) throw new TypeError('The MediaQueryList.media getter can only be used on instances of MediaQueryList')

		return internals.matches
	}

	get media(): string {
		const internals: MediaQueryListInternals = INTERNALS.get(this)

		if (!internals) throw new TypeError('The MediaQueryList.media getter can only be used on instances of MediaQueryList')

		return internals.media
	}
}

export const initMediaQueryList = (target: Target, exclude: Set<string>) => {
	if (exclude.has('matchMedia')) return

	target.matchMedia = function matchMedia(media: string) {
		const mql = Object.setPrototypeOf(new EventTarget(), MediaQueryList.prototype) as MediaQueryList

		INTERNALS.set(mql, {
			matches: false,
			media,
		} as MediaQueryListInternals)

		return mql
	}
}

interface MediaQueryListInternals {
	matches: boolean
	media: string
}

interface Target extends Record<any, any> {
	matchMedia: {
		(media: string): MediaQueryList
	}
}
