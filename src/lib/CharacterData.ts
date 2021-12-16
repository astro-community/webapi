export class CharacterData extends Node {
	get data(): string {
		return ''
	}
}

export function Text() {}

Text.prototype = Object.create(CharacterData.prototype)

export function Comment() {}

Comment.prototype = Object.create(CharacterData.prototype)
