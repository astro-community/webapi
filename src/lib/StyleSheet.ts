import { setStringTag } from './utils'

export class StyleSheet {}

export class CSSStyleSheet extends StyleSheet {
	async replace(text: string) {
		void text

		return new CSSStyleSheet()
	}

	replaceSync(text: string) {
		void text

		return new CSSStyleSheet()
	}

	get cssRules() {
		return []
	}
}

setStringTag(StyleSheet)
setStringTag(CSSStyleSheet)
