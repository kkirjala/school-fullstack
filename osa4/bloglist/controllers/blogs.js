const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.populate('user', { _id: 1, username: 1, name: 1 })
		.then(blogs => {
			response
				.status(200)
				.json(blogs.map(blog => Blog.format(blog)))
		})
})
  
blogsRouter.post('/', async (request, response) => {

	const user = await User.findOne({})

	let blog = new Blog({ user: user._id, ...request.body })
  
	try {
		const addedPost = await blog.save()

		user.blogs = user.blogs.concat(addedPost._id) // update blog-to-user "relation"
		await user.save()

		response
			.status(201)
			.json(addedPost)

	} catch (exception) {

		response
			.status(400)
			.json({ error: exception })

	}

})

blogsRouter.delete('/:id', async (request, response) => {

	const result = await Blog
		.findByIdAndRemove(request.params.id)

	if (result) {
		response.status(204).send()
	} else {
		response.status(404).send()
	}

})

blogsRouter.put('/:id', async (request, response) => {
	const result = await Blog
		.updateOne(
			{ _id: request.params.id },
			request.body
		)

	if (result) {
		response.status(204).send()
	} else {
		response.status(404).send()
	}

})

module.exports = blogsRouter