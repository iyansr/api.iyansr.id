const app = require('../api')
const request = require('supertest')
const mongoose = require('mongoose')

describe('Tag Post Endpoint Test', () => {
	it('should save new tag', async done => {
		const response = await request(app)
			.post('/.netlify/functions/api/v1/tag')
			.send({
				name: 'javascript',
				className: 'javascript',
			})
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('tag')
		expect(response.body.message).toEqual('Succes add tag')
		done()
	})

	it('should fail save new tag', async done => {
		const response = await request(app)
			.post('/.netlify/functions/api/v1/tag')
			.send({
				name: 'javascript',
				className: 'javascript',
			})
		expect(response.statusCode).toEqual(400)
		done()
	})

	it('should fail save new tag', async done => {
		const response = await request(app)
			.post('/.netlify/functions/api/v1/tag')
			.send({})
		expect(response.statusCode).toEqual(500)
		done()
	})

	it('should fetch all tags', async () => {
		const response = await request(app).get('/.netlify/functions/api/v1/tag')
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('tags')
	})

	afterAll(async () => {
		try {
			await mongoose.connection.db.dropDatabase()
			console.log('SUCCES DROP')
			await mongoose.connection.close()
			console.log('SUCCES CLOSE')
		} catch (error) {
			console.log('FAIL DROP', error)
		}
	})
})
