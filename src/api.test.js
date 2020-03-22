require('dotenv').config()

describe('Node Env test', () => {
	it('should set environtment === test', () => {
		expect(process.env.NODE_ENV).toBe('test')
	})
})
