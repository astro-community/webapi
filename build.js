import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { default as MagicString } from 'magic-string'
import { readFile as nodeReadFile } from 'node:fs/promises'
import { default as inject } from '@rollup/plugin-inject'

const readFileCache = Object.create(null)

const readFile = (/** @type {string} */ id) => readFileCache[id] || (readFileCache[id] = nodeReadFile(id, 'utf8'))

const pathToDOMException = new URL('./src/lib/DOMException.js', import.meta.url).pathname

const plugins = [
	nodeResolve({
		dedupe: [
			'net',
			'node:net'
		]
	}),
	inject({
		'AbortController': [ 'abort-controller/dist/abort-controller.mjs', 'AbortController' ],
		'ReadableStream': [ 'web-streams-polyfill/dist/ponyfill.es6.mjs', 'ReadableStream' ],
		'globalThis.ReadableStream': [ 'web-streams-polyfill/dist/ponyfill.es6.mjs', 'ReadableStream' ],
		'DOMException': [pathToDOMException, 'DOMException'],
	}),
	{
		async load(id) {
			const pathToEsm = id
			const pathToMap = `${pathToEsm}.map`

			const code = await readFile(pathToEsm, 'utf8')

			const indexes = []

			const replacements = [
				[ /(^|\n)import\s+[^']+'node:(fs|path|worker_threads)'/g, `` ],

				[ /\nif \(\s*typeof Global[\W\w]+?\n\}/g, `` ],
				[ /\nif \(\s*typeof window[\W\w]+?\n\}/g, `` ],
				[ /\nif \(!globalThis\.ReadableStream\) \{[\W\w]+?\n\}/g, `` ],
				[ /\nif \(typeof SymbolPolyfill[\W\w]+?\n\}/g, `` ],

				[ /\nconst globals = getGlobals\(\);/g, `` ],
				[ /\nconst queueMicrotask = [\W\w]+?\n\}\)\(\);/g, ``],
				[ /\nconst NativeDOMException =[^;]+;/g, `` ],
				[ /\nconst SymbolPolyfill\s*=[^;]+;/g, '\nconst SymbolPolyfill = Symbol;'],
				[ /\n(const|let) DOMException[^;]*;/g, `let DOMException$1=DOMException` ],
				[ /\nconst DOMException = globalThis.DOMException[\W\w]+?\}\)\(\)/g, `` ],

				[ / new DOMException\$1/g, `new DOMException` ],
				[ / from 'net'/g, `from 'node:net'` ],
				[ / throw createInvalidStateError/g, `throw new DOMException` ],
				[ /= createAbortController/g, `= new AbortController` ],
				[ /\nconst queueMicrotask = [\W\w]+?\n\}\)\(\)\;/g, `` ],
			]

			for (const [replacee, replacer] of replacements) {
				replacee.index = 0

				let replaced = null

				while ((replaced = replacee.exec(code)) !== null) {
					const leadIndex = replaced.index
					const tailIndex = replaced.index + replaced[0].length

					indexes.unshift([ leadIndex, tailIndex, replacer ])
				}
			}

			if (indexes.length) {
				const magicString = new MagicString(code)

				indexes.sort(
					([leadOfA], [leadOfB]) => leadOfA - leadOfB
				)

				for (const [leadIndex, tailindex, replacer] of indexes) {
					magicString.overwrite(leadIndex, tailindex, replacer)
				}

				const magicMap = magicString.generateMap({ source: pathToEsm, file: pathToMap, includeContent: true })

				const modifiedEsm = magicString.toString()
				const modifiedMap = magicMap.toString()

				return { code: modifiedEsm, map: modifiedMap }
			}
		},
	},
]



async function build() {
	const configs = [
		{
			inputOptions: {
				input: 'src/polyfill.js',
				plugins: plugins,
				onwarn(warning, warn) {
					if (warning.code !== 'UNRESOLVED_IMPORT') warn(warning)
				},
			},
			outputOptions: {
				inlineDynamicImports: true,
				file: 'mod.js',
				format: 'esm',
				sourcemap: true,
			},
		},
	]

	for (const config of configs) {
		const bundle = await rollup(config.inputOptions)

		// or write the bundle to disk
		await bundle.write(config.outputOptions)

		// closes the bundle
		await bundle.close()
	}
}

build()