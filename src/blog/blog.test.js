const app = require('../api')
const request = require('supertest')

describe('Blog Post Endpoint Test', () => {
	it('should fetch all post', async () => {
		const response = await request(app).get('/.netlify/functions/api/v1/blog')
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('list')
	})

	it('should fetch individual post', async () => {
		const id = 'hello-world-cqdelhjmv'
		const response = await request(app).get(`/.netlify/functions/api/v1/blog/${id}`)
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('post')
	})
})
