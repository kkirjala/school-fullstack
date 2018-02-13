const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', (request, response) => {
	User
		.find({})
		.then(users => {
			response.status(200).json(users)
		})
})

usersRouter.post('/', async (request, response) => {
	try {
		const body = request.body

		const saltRounds = 10
		const passwordHash = await bcrypt.hash(body.password, saltRounds)

		const user = new User({
			username: body.username,
			name: body.name,
			adult: body.adult,
			passwordHash
		})

		const savedUser = await user.save()

		response.status(201).json(savedUser)
	} catch (exception) {
		response.status(400).json({ error: exception })
	}
})

module.exports = usersRouter