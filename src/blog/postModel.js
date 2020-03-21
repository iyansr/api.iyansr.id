const mongoose = require('mongoose')
const Schema = mongoose.Schema
const marked = require('marked')
const slugify = require('slugify')
const shortId = require('shortid')

const PostSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	slug: {
		type: String,
		unique: true,
	},
	title: {
		type: String,
		required: [true, "can't be empty"],
	},
	thumbnail: {
		type: String,
		required: [true, "can't be empty"],
	},
	previewDesc: {
		type: String,
		required: [true, "can't be empty"],
	},
	markdown: {
		type: String,
		required: [true, "can't be empty"],
	},
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tags',
		},
	],
	sanitizedHtml: {
		type: String,
	},
})

PostSchema.pre('validate', function(next) {
	if (this.title) {
		this.slug = slugify(this.title + ` ${shortId.generate()}`, { lower: true, strict: true })
	}

	if (this.markdown) {
		this.sanitizedHtml = marked(this.markdown)
	}

	next()
})

module.exports = Post = mongoose.model('posts', PostSchema)
