import { INTERNALS, internalsOf } from './utils'

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

	getContext(contextType: string): CanvasRenderingContext2D {
		internalsOf<HTMLCanvasElementInternals>(this, 'HTMLCanvasElement', 'getContext')

		void contextType

		const context = Object.create(CanvasRenderingContext2D.prototype) as CanvasRenderingContext2D

		INTERNALS.set(context, {
			canvas: this,
			direction: 'inherit',
			fillStyle: '#000',
			filter: 'none',
			font: '10px sans-serif',
			globalAlpha: 0,
			globalCompositeOperation: 'source-over',
			imageSmoothingEnabled: false,
			imageSmoothingQuality: 'high',
			lineCap: 'butt',
			lineDashOffset: 0.0,
			lineJoin: 'miter',
			lineWidth: 1.0,
			miterLimit: 10.0,
			shadowBlur: 0,
			shadowColor: '#000',
			shadowOffsetX: 0,
			shadowOffsetY: 0,
			strokeStyle: '#000',
			textAlign: 'start',
			textBaseline: 'alphabetic',
		})

		return context
	}

	toBlob() {}

	toDataURL() {}

	transferControlToOffscreen() {}
}

export class CanvasRenderingContext2D {
	get canvas(): HTMLCanvasElement | null {
		return internalsOf(this, 'CanvasRenderingContext2D', 'canvas').canvas
	}

	get direction(): 'ltr' | 'rtl' | 'inherit' {
		return internalsOf(this, 'CanvasRenderingContext2D', 'direction').direction
	}

	get fillStyle(): string {
		return internalsOf(this, 'CanvasRenderingContext2D', 'fillStyle').fillStyle
	}

	get filter(): string {
		return internalsOf(this, 'CanvasRenderingContext2D', 'filter').filter
	}

	get globalAlpha(): number {
		return internalsOf(this, 'CanvasRenderingContext2D', 'globalAlpha').globalAlpha
	}

	get globalCompositeOperation(): string {
		return internalsOf(this, 'CanvasRenderingContext2D', 'globalCompositeOperation').globalCompositeOperation
	}

	get font(): string {
		return internalsOf(this, 'CanvasRenderingContext2D', 'font').font
	}

	get imageSmoothingEnabled(): boolean {
		return internalsOf(this, 'CanvasRenderingContext2D', 'imageSmoothingEnabled').imageSmoothingEnabled
	}

	get imageSmoothingQuality(): 'low' | 'medium' | 'high' {
		return internalsOf(this, 'CanvasRenderingContext2D', 'imageSmoothingQuality').imageSmoothingQuality
	}

	get lineCap(): 'butt' | 'round' | 'square' {
		return internalsOf(this, 'CanvasRenderingContext2D', 'lineCap').lineCap
	}

	get lineDashOffset(): number {
		return internalsOf(this, 'CanvasRenderingContext2D', 'lineDashOffset').lineDashOffset
	}

	get lineJoin(): 'bevel' | 'round' | 'miter' {
		return internalsOf(this, 'CanvasRenderingContext2D', 'lineJoin').lineJoin
	}

	get lineWidth(): number {
		return internalsOf(this, 'CanvasRenderingContext2D', 'lineWidth').lineWidth
	}

	get miterLimit(): number {
		return internalsOf(this, 'CanvasRenderingContext2D', 'miterLimit').miterLimit
	}

	get strokeStyle(): string {
		return internalsOf(this, 'CanvasRenderingContext2D', 'strokeStyle').strokeStyle
	}

	get shadowOffsetX(): number {
		return internalsOf(this, 'CanvasRenderingContext2D', 'shadowOffsetX').shadowOffsetX
	}

	get shadowOffsetY(): number {
		return internalsOf(this, 'CanvasRenderingContext2D', 'shadowOffsetY').shadowOffsetY
	}

	get shadowBlur(): number {
		return internalsOf(this, 'CanvasRenderingContext2D', 'shadowBlur').shadowBlur
	}

	get shadowColor(): string {
		return internalsOf(this, 'CanvasRenderingContext2D', 'shadowColor').shadowColor
	}

	get textAlign(): 'left' | 'right' | 'center' | 'start' | 'end' {
		return internalsOf(this, 'CanvasRenderingContext2D', 'textAlign').textAlign
	}

	get textBaseline(): 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom' {
		return internalsOf(this, 'CanvasRenderingContext2D', 'textBaseline').textBaseline
	}

	arc() {}
	arcTo() {}
	beginPath() {}
	bezierCurveTo() {}
	clearRect() {}
	clip() {}
	closePath() {}
	createImageData() {}
	createLinearGradient() {}
	createPattern() {}
	createRadialGradient() {}
	drawFocusIfNeeded() {}
	drawImage() {}
	ellipse() {}
	fill() {}
	fillRect() {}
	fillText() {}
	getContextAttributes() {}
	getImageData() {}
	getLineDash() {}
	getTransform() {}
	isPointInPath() {}
	isPointInStroke() {}
	lineTo() {}
	measureText() {}
	moveTo() {}
	putImageData() {}
	quadraticCurveTo() {}
	rect() {}
	resetTransform() {}
	restore() {}
	rotate() {}
	save() {}
	scale() {}
	setLineDash() {}
	setTransform() {}
	stroke() {}
	strokeRect() {}
	strokeText() {}
	transform() {}
	translate() {}
}

interface HTMLCanvasElementInternals {
	width: number
	height: number
}
