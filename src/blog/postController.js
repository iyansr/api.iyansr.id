const Post = require('./postModel')

class PostController {
	static async getPost(req, res) {
		try {
			for (var i in req.query) {
				req.query[i] = { $regex: req.query[i], $options: 'i' }
			}
			const post = await Post.findOne({ slug: req.params.slug, ...req.query })

			if (!post) {
				return res.status(404).json({
					url: req.originalUrl,
					method: 'GET',
					code: 404,
					message: 'Post Not Found',
				})
			}

			res.json({
				url: req.originalUrl,
				method: 'GET',
				code: 200,
				post,
			})
		} catch (error) {
			res.status(500).json({
				message: 'Internal server error',
			})
		}
	}

	static async getAllPost(req, res) {
		try {
			for (var i in req.query) {
				req.query[i] = { $regex: req.query[i], $options: 'i' }
			}

			const posts = await Post.find(req.query)
				.select(['-sanitizedHtml', '-markdown'])
				.populate('tags')

			res.status(200).json({
				url: req.originalUrl,
				method: 'GET',
				code: 200,
				list: posts,
			})
		} catch (error) {
			console.log('ERRORR', error)
			res.status(500).json({
				message: 'Internal server error',
			})
		}
	}

	static async addPost(req, res) {
		try {
			let tags

			if (Array.isArray(req.body.tagsId)) {
				tags = req.body.tagsId.map(tag => ({
					_id: tag,
				}))
			} else {
				tags = req.body.tagsId
			}

			const newPost = new Post({
				title: req.body.title,
				previewDesc: req.body.previewDesc,
				markdown: req.body.markdown,
				thumbnail: req.body.thumbnail,
				tags: tags,
			})

			const post = await newPost.save()

			res.send({
				url: req.originalUrl,
				method: 'POST',
				post: post,
			})
		} catch (error) {
			console.log('ERROR', error)
			res.status(500).json({
				message: 'Internal server error',
			})
		}
	}
}

module.exports = PostController
