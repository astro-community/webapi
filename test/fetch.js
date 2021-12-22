import { assert, test } from '../run/test.setup.js'
import { polyfill } from '../mod.js'

test(() => {
	return [
		{
			name: 'Fetch functionality',
			test() {
				const target = {}
	
				polyfill(target)
	
				assert.equal(Reflect.has(target, 'fetch'), true)
				assert.equal(typeof target.fetch, 'function')
			},
		},
		{
			name: 'Fetch with https',
			async test() {
				const target = {}
	
				polyfill(target)

                const { fetch } = target

                const response = await fetch('https://api.openbrewerydb.org/breweries')

				assert.equal(response.constructor, target.Response)

                const json = await response.json()

                assert.equal(Array.isArray(json), true)
			},
		},
		{
			name: 'Fetch with file',
			async test() {
				const target = {}
	
				polyfill(target)

                const { fetch } = target

                const url = new URL('../package.json', import.meta.url)

                const response = await fetch(url)

				assert.equal(response.constructor, target.Response)

                const json = await response.json()

                assert.equal(json.name, '@astropub/webapi')
			},
		},
		{
			name: 'Fetch with relative file',
			async test() {
				const target = {}
	
				polyfill(target)

                const { fetch } = target

                const response = await fetch('../package.json')

                const json = await response.json()

                assert.equal(json.name, '@astropub/webapi')
			},
		},
		{
			name: 'Fetch with data',
			async test() {
				const target = {}
	
				polyfill(target)

                const { fetch } = target

                const jsonURI = `data:application/json,${encodeURIComponent(JSON.stringify({
                    name: '@astropub/webapi'
                }))}`

                const response = await fetch(jsonURI)

                const json = await response.json()

                assert.equal(json.name, '@astropub/webapi')
			},
		},
	]
})
