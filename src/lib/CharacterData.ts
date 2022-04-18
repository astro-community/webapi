import * as _ from './utils'

export class CharacterData extends Node {
	constructor(data: string) {
		super()

		_.INTERNALS.set(this, {
			data: String(data),
		} as CharacterDataInternals)
	}

	get data(): string {
		return _.internalsOf<CharacterDataInternals>(this, 'CharacterData', 'data').data
	}

	get textContent(): string {
		return _.internalsOf<CharacterDataInternals>(this, 'CharacterData', 'textContent').data
	}
}

export class Comment extends CharacterData {}

export class Text extends CharacterData {
	get assignedSlot(): HTMLSlotElement | null {
		return null
	}

	get wholeText(): string {
		return _.internalsOf<CharacterDataInternals>(this, 'CharacterData', 'textContent').data
	}

	get nodeName() {
		return '#text'
	}
}

_.assignStringTag(CharacterData)
_.assignStringTag(Text)
_.assignStringTag(Comment)

interface CharacterDataInternals {
	data: string
}
