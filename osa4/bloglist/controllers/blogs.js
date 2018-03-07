const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
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
  
	try {

		const decodedToken = jwt.verify(request.token, process.env.BCRYPT_SECRET)

		if (!request.token || !decodedToken.id) {
			return response
				.status(401)
				.json({ error: 'authentication token missing or invalid' })
		}

		let blog = new Blog({
			user: decodedToken.id, 
			title: request.body.title,
			author: request.body.author,
			url: request.body.url			
		}) // userid == tokenid

		const addedPost = await blog.save()

		const user = await User.findOne({ _id: decodedToken.id })
		user.blogs = user.blogs.concat(addedPost._id) // update blog-to-user "relation"
		await user.save()

		response
			.status(201)
			.json(addedPost)

	} catch (exception) {

		if (exception.name === 'JsonWebTokenError' ) {
			return response
				.status(401)
				.json({ error: 'authentication token invalid or expired' })
		}

		return response
			.status(400)
			.json({ error: exception })

	}

})

blogsRouter.delete('/:id', async (request, response) => {

	try {

		const decodedToken = jwt.verify(request.token, process.env.BCRYPT_SECRET)

		if (!request.token || !decodedToken.id) {
			return response
				.status(401)
				.json({ error: 'authentication token missing or invalid' })
		}
	
		const blog = await Blog
			.findOneAndRemove({ _id: request.params.id, user: decodedToken.id })
	
		if (!blog) { // no matching post found
			return response
				.status(404)
				.json({ error: 'no post found or unauthorized request' })
		}
	
		return response.status(204).send() // successful deletion

	} catch (exception) {

		if (exception.name === 'JsonWebTokenError' ) {
			return response
				.status(401)
				.json({ error: 'authentication token invalid or expired' })
		}

		return response
			.status(400)
			.json({ error: exception })
		
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