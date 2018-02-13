const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = mongoose.model('User', {
	username: {
		type: String,
		unique: true
	},
	name: {
		type: String,
	},
	adult: {
		type: Boolean,
		default: true
	},
	passwordHash: {
		type: String,
		minlength: 3,
		
		set: (value) => {
			const salt = bcrypt.genSaltSync(10)
			const hash = bcrypt.hashSync(value, salt)
			return value.length <= 3 ? value : hash // minimum pw length validation
		}
		
	}
})

module.exports = User