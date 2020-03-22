const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	className: {
		type: String,
		required: true,
	},
})

module.exports = Tag = mongoose.model('tags', TagSchema)
