import * as _ from './utils'

export class CustomElementRegistry {
	/** Defines a new custom element using the given tag name and HTMLElement constructor. */
	define(localName: string, constructor: Function, options?: ElementDefinitionOptions) {
		const internals = _.internalsOf<CustomElementRegistryInternals>(this, 'CustomElementRegistry', 'define')
		const document = internals.document
		const documentInternals = _.internalsOf<DocumentInternals>(document, 'CustomElementRegistry', 'define')

		localName = getCustomElementLocalName(localName)

		documentInternals.constructorByName.set(localName, constructor)
		documentInternals.nameByConstructor.set(constructor, localName)

		_.INTERNALS.set(constructor, <ElementConstructorInternals>{ document })

		void options
	}

	/** Returns the constructor associated with the given tag name. */
	get(localName: string) {
		const internals = _.internalsOf<CustomElementRegistryInternals>(this, 'CustomElementRegistry', 'define')
		const documentInternals = _.internalsOf<DocumentInternals>(internals.document, 'CustomElementRegistry', 'define')

		return documentInternals.constructorByName.get(localName)
	}

	getName(constructor: Function) {
		const internals = _.internalsOf<CustomElementRegistryInternals>(this, 'CustomElementRegistry', 'define')
		const documentInternals = _.internalsOf<DocumentInternals>(internals.document, 'CustomElementRegistry', 'define')

		return documentInternals.nameByConstructor.get(constructor)
	}
}

_.assignStringTag(CustomElementRegistry)

// initialization
// -----------------------------------------------------------------------------

export const initCustomElementRegistry = (target: any, exclude: Set<string>, pseudo: any) => {
	if (!_.hasOwn(pseudo, 'customElements')) {
		/** Reference to the CustomElementRegistry object. */
		const customElements: CustomElementRegistry = pseudo.customElements = target.customElements || Object.create(target.CustomElementRegistry.prototype)

		_.internalsTo<CustomElementRegistryInternals>(customElements, {
			document: pseudo.document
		})
	}

	if (!exclude.has('customElements')) target.customElements = pseudo.customElements
}

// internal functionality
// -----------------------------------------------------------------------------

const getCustomElementLocalName = (localName: any): string => {
	localName = String(localName)

	if (/[A-Z]/.test(localName)) throw new SyntaxError('Custom element name cannot contain an uppercase ASCII letter')
	if (!/^[a-z]/.test(localName)) throw new SyntaxError('Custom element name must have a lowercase ASCII letter as its first character')
	if (!/-/.test(localName)) throw new SyntaxError('Custom element name must contain a hyphen')

	localName = localName.toLowerCase()

	return localName
}

// interfaces
// -----------------------------------------------------------------------------

interface ElementDefinitionOptions {
	extends?: string | undefined;
}

interface CustomElementRegistryInternals {
	document: Document
}

interface DocumentInternals {
	activeElement: HTMLElement,
	body: HTMLBodyElement
	documentElement: HTMLHtmlElement
	head: HTMLHeadElement

	constructorByName: Map<string, Function>
	nameByConstructor: Map<Function, string>
}

interface ElementConstructorInternals {
	document: Document
}
