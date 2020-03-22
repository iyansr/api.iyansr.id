const blog = require('./postController')
const express = require('express')

const router = express.Router()

router.get('/:slug', blog.getPost)
router.get('/', blog.getAllPost)
router.post('/', blog.addPost)

module.exports = router
