/** Evaluates an expression after a number of milliseconds, returning a numeric id for the timer. */
export declare var setTimeout: {
	<TArgs extends any[]>(callback: (...args: TArgs) => void, delay?: number, ...args: TArgs): number
}

/** Clears a timer set with a given id. */
export declare var clearTimeout: {
	(timeout: number): void
}
