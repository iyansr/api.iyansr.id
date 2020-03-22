const app = require('../api')
const request = require('supertest')

describe('Tag Post Endpoint Test', () => {
	it('should fetch all tags', async () => {
		const response = await request(app).get('/.netlify/functions/api/v1/tag')
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('tags')
	})
})
