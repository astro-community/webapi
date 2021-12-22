import { pathFrom, spawn } from './test.setup.js'

const pathToRoot = pathFrom(import.meta.url, '../')
const pathToTest = pathFrom(import.meta.url, './test.all.js')

const test = async () => {
	await spawn('volta', ['run', '--node', '12', 'node', pathToTest], { cwd: pathToRoot, env: { ...process.env }, stdio: 'inherit' })
	await spawn('volta', ['run', '--node', '14', 'node', pathToTest], { cwd: pathToRoot, env: { ...process.env }, stdio: 'inherit' })
	await spawn('volta', ['run', '--node', '16', 'node', pathToTest], { cwd: pathToRoot, env: { ...process.env }, stdio: 'inherit' })
}

test()
