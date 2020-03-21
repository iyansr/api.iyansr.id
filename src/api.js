require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()
const Route = require('./router')
const cors = require('cors')
const bodyParser = require('body-parser')

mongoose
	.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('DATABASE CONNECTED')
	})
	.catch(err => console.log('ERROR CONNECTING TO DATABASE', err))

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
	})
})

module.exports = app
module.exports.handler = serverless(app)
