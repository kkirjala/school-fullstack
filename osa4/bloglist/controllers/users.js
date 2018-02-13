const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', (request, response) => {
	User
		.find({})
		.then(users => {
			response.status(200).json(users)
		})
})

usersRouter.post('/', (request, response) => {

	const body = request.body

	const user = new User({
		username: body.username,
		name: body.name,
		adult: body.adult,
		passwordHash: body.password // hashing taken care of the model setter function
	})

	user
		.save()
		.then(savedUser => {
			response.status(201).json(savedUser)
		})
		.catch(err => {
			response.status(400).json({ error: err })
		})

})

module.exports = usersRouter