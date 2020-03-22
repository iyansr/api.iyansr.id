require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const Route = require('./router')
const cors = require('cors')
const bodyParser = require('body-parser')

const connectDB = async () => {
	try {
		if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
			await mongoose.connect(
				`mongodb+srv://${process.env.MONGO_ADMIN}:${process.env.MONGO_PASSWORD}@cluster0-uzhdu.gcp.mongodb.net/test?retryWrites=true&w=majority`,
				{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
				err => {
					if (!err) {
						console.log('DATABASE CONNECTED TO DEVELOPMENT/TEST')
					} else {
						console.log('ERROR CONNECTING TO DATABASE DEVELOPMENT/TEST', err)
					}
				}
			)
		}
		if (process.env.NODE_ENV === 'production') {
			await mongoose.connect(
				process.env.MONGO_URL,
				{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
				err => {
					if (!err) {
						console.log('DATABASE CONNECTED TO PRODUCTION')
					} else {
						console.log('ERROR CONNECTING TO DATABASE PRODUCTION', err)
					}
				}
			)
		}
	} catch (error) {
		console.log('DATABASE ERROR', error)
	}
}

app.set('view engine', 'ejs')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('./upload'))

app.use(`/.netlify/functions/api`, router)
app.use(`/.netlify/functions/api/v1`, Route)

router.get('/', (req, res) => {
	res.json({
		hello: 'hi!',
		nodeEnv: process.env.NODE_ENV,
	})
})

connectDB()
module.exports = app
module.exports.handler = serverless(app)
