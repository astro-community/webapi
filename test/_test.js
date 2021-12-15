import { fork, pathFrom } from './_setup.js'

const pathToBasic = pathFrom(import.meta.url, './basic.js')
const pathToOptions = pathFrom(import.meta.url, './options.js')

const test = async () => {
	await fork(pathToBasic)
	await fork(pathToOptions)
}

test()
