const blog = require('./blog')
const tag = require('./tag')
const express = require('express')

const router = express.Router()

router.use('/blog', blog)
router.use('/tag', tag)

module.exports = router
