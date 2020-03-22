require('dotenv').config()

describe('Node Env test', () => {
	it('should set environtment === test', done => {
		expect(process.env.NODE_ENV).toBe('test')
		done()
	})
})
