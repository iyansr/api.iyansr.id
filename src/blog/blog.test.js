require('dotenv').config()
const mongoose = require('mongoose')

const app = require('../api')
const request = require('supertest')

describe('Blog Post Endpoint Test', () => {
	it('should fetch all post', async function(done) {
		const response = await request(app).get('/.netlify/functions/api/v1/blog')
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('list')
		expect(response.body).toHaveProperty('code')
		expect(response.body.code).toEqual(200)
		done()
	})

	it('should fetch individual post', async function(done) {
		const id = 'hello-world-cqdelhjmv'
		const response = await request(app).get(`/.netlify/functions/api/v1/blog/${id}`)
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('post')
		expect(response.body).toHaveProperty('code')
		expect(response.body.code).toEqual(200)
		done()
	})
})
