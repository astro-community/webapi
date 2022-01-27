import { setStringTag } from './utils'

export class CharacterData extends Node {
	get data(): string {
		return ''
	}
}

export function Text() {}

Text.prototype = Object.create(CharacterData.prototype)

export function Comment() {}

Comment.prototype = Object.create(CharacterData.prototype)

setStringTag(CharacterData)
setStringTag(Text)
setStringTag(Comment)
