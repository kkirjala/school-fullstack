const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


const getTokenFrom = (request) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}


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
  
	try {

		const token = getTokenFrom(request)
		const decodedToken = jwt.verify(token, process.env.BCRYPT_SECRET)

		if (!token || !decodedToken.id) {
			return response
				.status(401)
				.json({ error: 'authentication token missing or invalid' })
		}

		let blog = new Blog({ user: decodedToken.id, ...request.body }) // userid == tokenid

		const addedPost = await blog.save()

		const user = await User.findOne({ _id: decodedToken.id })
		user.blogs = user.blogs.concat(addedPost._id) // update blog-to-user "relation"
		await user.save()

		response
			.status(201)
			.json(addedPost)

	} catch (exception) {

		if (exception.name === 'JsonWebTokenError' ) {
			response.status(401).json({ error: 'authentication token invalid or expired' })
		}

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