const mongoose = require('mongoose')

require('dotenv').config()
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const blogSchema = mongoose.Schema(
	{
		title: String,
		author: String,
		url: String,
		likes: Number
	}
)

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog