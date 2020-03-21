const tag = require('./tagController')
const express = require('express')

const router = express.Router()

// router.get('/:slug', blog.getPost)
router.get('/', tag.getTags)
router.post('/', tag.addTag)

module.exports = router
