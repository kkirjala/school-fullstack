const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', (request, response) => {
	User
		.find({})
		.then(user => {
			response
				.status(200)
				.json(user.map(user => User.format(user)))
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
			response.status(201).json(User.format(savedUser))
		})
		.catch(err => {
			response.status(400).json({ error: err })
		})

})

module.exports = usersRouter