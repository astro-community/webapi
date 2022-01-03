import { fork, pathFrom } from './test.setup.js'

const test = async () => {
	await fork(pathFrom(import.meta.url, '../test/basic.js'))
	await fork(pathFrom(import.meta.url, '../test/options.js'))
	await fork(pathFrom(import.meta.url, '../test/elements.js'))
	await fork(pathFrom(import.meta.url, '../test/media.js'))
	await fork(pathFrom(import.meta.url, '../test/fetch.js'))
	await fork(pathFrom(import.meta.url, '../test/imagedata.js'))
	await fork(pathFrom(import.meta.url, '../test/offscreencanvas.js'))
}

test()
