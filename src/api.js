require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const Route = require('./router')
const cors = require('cors')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
	mongoose
		.connect(process.env.MONGO_URL_TEST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
		.then(() => {
			console.log('DATABASE CONNECTED TO DEVELOPMENT/TEST')
		})
		.catch(err => console.log('ERROR CONNECTING TO DATABASE DEVELOPMENT/TEST', err))
}

if (process.env.NODE_ENV === 'production') {
	mongoose
		.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
		.then(() => {
			console.log('DATABASE CONNECTED TO PRODUCTION')
		})
		.catch(err => console.log('ERROR CONNECTING TO DATABASE PRODUCTION', err))
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

module.exports = app
module.exports.handler = serverless(app)
