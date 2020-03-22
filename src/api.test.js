require('dotenv').config()
const app = require('./api')
const request = require('supertest')
const mongoose = require('mongoose')

describe('Node Env test', () => {
	it('should set environtment === test', done => {
		expect(process.env.NODE_ENV).toBe('test')
		done()
	})

	it('should work', async done => {
		const response = await request(app).get('/.netlify/functions/api')
		expect(response.statusCode).toEqual(200)
		done()
	})

	afterAll(async () => {
		try {
			await mongoose.connection.close()
			console.log('SUCCES CLOSE')
		} catch (error) {
			console.log('FAIL DROP', error)
		}
	})
})
