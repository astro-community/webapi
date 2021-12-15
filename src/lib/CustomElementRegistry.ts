import { INTERNALS_FOR } from './utils'

export class CustomElementRegistry {
	/** Defines a new custom element using the given tag name and HTMLElement constructor. */
	define(name: string, constructor: typeof HTMLElement, options?: any) {
		void options

		const internals = INTERNALS_FOR<ElementRegistryInternals>(this)

		name = String(name).toUpperCase()

		internals.constructorByName.set(name, constructor)
		internals.nameByConstructor.set(constructor, name)
	}

	/** Returns the constructor associated with the given tag name. */
	get(name: string) {
		const internals = INTERNALS_FOR<ElementRegistryInternals>(this)

		name = String(name).toUpperCase()

		return internals.constructorByName.get(name)
	}

	for(constructor: typeof HTMLElement) {
		const internals = INTERNALS_FOR<ElementRegistryInternals>(this)

		return internals.nameByConstructor.get(constructor)
	}
}

interface ElementRegistryInternals {
	constructorByName: Map<string, typeof HTMLElement>;
	nameByConstructor: Map<typeof HTMLElement, string>;
}
