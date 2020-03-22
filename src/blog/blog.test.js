require('dotenv').config()
const mongoose = require('mongoose')

const app = require('../api')
const request = require('supertest')

describe('Blog Post Endpoint Test', () => {
	it('should save new post', async done => {
		const response = await request(app)
			.post('/.netlify/functions/api/v1/blog')
			.send({
				title: 'Hello World',
				markdown:
					'# Hello World \nHi, this is my first post \nAll things i want to write, will go in this section !! \n😆😆',
				thumbnail:
					'https://res.cloudinary.com/iyansrcloud/image/upload/v1584726371/iyansr.id/blog/hello_world_hys6s6.webp',
				previewDesc: 'Hello World',
				tagsId: '5e771af013507c26864c0eab',
			})
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('post')
		expect(response.body.method).toEqual('POST')
		done()
	})

	it('should failed save new post', async done => {
		const response = await request(app)
			.post('/.netlify/functions/api/v1/blog')
			.send({})
		expect(response.statusCode).toEqual(500)
		done()
	})

	it('should fetch all post', async done => {
		const response = await request(app).get('/.netlify/functions/api/v1/blog')
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('list')
		expect(response.body).toHaveProperty('code')
		expect(response.body.code).toEqual(200)
		done()
	})

	it('should fail fetch all post', async done => {
		const response = await request(app).get('/.netlify/functions/api/v1/blog?tags=asd')
		expect(response.statusCode).toEqual(500)
		done()
	})

	it('should fetch individual post', async done => {
		const responseGet = await request(app).get('/.netlify/functions/api/v1/blog')
		const id = responseGet.body.list[0].slug
		const response = await request(app).get(`/.netlify/functions/api/v1/blog/${id}`)
		expect(response.statusCode).toEqual(200)
		expect(response.body).toHaveProperty('post')
		expect(response.body).toHaveProperty('code')
		expect(response.body.code).toEqual(200)
		done()
	})

	it('should fail fetch individual post', async done => {
		const id = 'asdad'
		const response = await request(app).get(`/.netlify/functions/api/v1/blog/${id}`)
		expect(response.statusCode).toEqual(404)
		expect(response.body.code).toEqual(404)
		done()
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
