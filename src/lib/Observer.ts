import { setStringTag } from './utils'

export class IntersectionObserver {
	disconnect() {}

	observe() {}

	takeRecords() {
		return []
	}

	unobserve() {}
}

export class MutationObserver {
	disconnect() {}

	observe() {}

	takeRecords() {
		return []
	}

	unobserve() {}
}

export class ResizeObserver {
	disconnect() {}

	observe() {}

	takeRecords() {
		return []
	}

	unobserve() {}
}

setStringTag(MutationObserver)
setStringTag(IntersectionObserver)
setStringTag(ResizeObserver)
