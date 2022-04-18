import * as _ from './utils'

export class MediaQueryList extends EventTarget {
	get matches(): boolean {
		return _.internalsOf(this, 'MediaQueryList', 'matches').matches
	}

	get media(): string {
		return _.internalsOf(this, 'MediaQueryList', 'media').media
	}
}

_.assignStringTag(MediaQueryList)

export const initMediaQueryList = (target: any, exclude: Set<string>, pseudo: any) => {
	if (!_.hasOwn(pseudo, 'matchMedia')) {
		pseudo.matchMedia = function matchMedia(media: string) {
			const mql = Object.setPrototypeOf(new pseudo.EventTarget, pseudo.MediaQueryList.prototype) as MediaQueryList

			_.INTERNALS.set(mql, {
				matches: false,
				media,
			})

			return mql
		}
	}

	if (!exclude.has('MediaQueryList') && !exclude.has('matchMedia')) target.matchMedia = pseudo.matchMedia
}
