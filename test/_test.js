import { fork, pathFrom } from './_setup.js'

const test = async () => {
	await fork(pathFrom(import.meta.url, './basic.js'))
	await fork(pathFrom(import.meta.url, './options.js'))
	await fork(pathFrom(import.meta.url, './elements.js'))
	await fork(pathFrom(import.meta.url, './media.js'))
}

test()
