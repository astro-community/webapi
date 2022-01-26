import { fork, pathFrom } from './test.setup.js'

const test = async () => {
	await fork(pathFrom(import.meta.url, '../test/basic.js'))
	await fork(pathFrom(import.meta.url, '../test/options.js'))
	await fork(pathFrom(import.meta.url, '../test/elements.js'))
	await fork(pathFrom(import.meta.url, '../test/media.js'))
	await fork(pathFrom(import.meta.url, '../test/fetch.js'))
	await fork(pathFrom(import.meta.url, '../test/internals.js'))
	await fork(pathFrom(import.meta.url, '../test/imagedata.js'))
	await fork(pathFrom(import.meta.url, '../test/offscreencanvas.js'))
	await fork(pathFrom(import.meta.url, '../test/base64.js'))
}

test()
