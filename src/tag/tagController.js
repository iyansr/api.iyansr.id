const Tag = require('./tagModel')

class TagController {
	static async getTags(req, res) {
		try {
			const tags = await Tag.find()
			res.status(200).json({
				tags,
			})
		} catch (error) {
			res.status(500).json({
				message: 'Internal server error',
			})
		}
	}

	static async addTag(req, res) {
		try {
			const tag = await Tag.findOne({ name: req.body.name })
			if (tag) {
				return res.status(400).json({
					message: 'Tag already exist',
				})
			}

			const newTag = new Tag({
				name: req.body.name,
			})

			const savedTag = await newTag.save()

			res.status(200).json({
				message: 'Succes add tag',
				tag: savedTag,
			})
		} catch (error) {
			res.status(500).json({
				message: 'Internal server error',
			})
		}
	}
}

module.exports = TagController
