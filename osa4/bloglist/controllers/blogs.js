const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})
  
blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body)
  
	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
		.catch(err => {
			response.status(400).json({ error: err })
		})
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