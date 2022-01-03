import type { CanvasRenderingContext2D } from './CanvasRenderingContext2D'

import { internalsOf } from './utils'
import { __createCanvasRenderingContext2D } from './CanvasRenderingContext2D'

export class HTMLCanvasElement extends HTMLElement {
	get height(): number {
		return internalsOf(this, 'HTMLCanvasElement', 'height').height
	}

	set height(value) {
		internalsOf(this, 'HTMLCanvasElement', 'height').height = Number(value) || 0
	}

	get width(): number {
		return internalsOf(this, 'HTMLCanvasElement', 'width').width
	}

	set width(value) {
		internalsOf(this, 'HTMLCanvasElement', 'width').width = Number(value) || 0
	}

	captureStream(): null {
		return null
	}

	getContext(contextType: PredefinedContextId): CanvasRenderingContext2D | null {
		const internals = internalsOf<HTMLCanvasElementInternals>(this, 'HTMLCanvasElement', 'getContext')

		switch (contextType) {
			case '2d':
				if (internals.renderingContext2D) return internals.renderingContext2D

				internals.renderingContext2D = __createCanvasRenderingContext2D(this)

				return internals.renderingContext2D
			default:
				return null
		}
	}

	toBlob() {}

	toDataURL() {}

	transferControlToOffscreen() {}
}

interface HTMLCanvasElementInternals {
	width: number
	height: number
	renderingContext2D: CanvasRenderingContext2D
}

type PredefinedContextId = '2d' | 'bitmaprenderer' | 'webgl' | 'webgl2' | 'webgpu'
