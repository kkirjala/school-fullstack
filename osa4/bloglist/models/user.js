const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
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

userSchema.statics.format = (user) => {
	return {
		id: user.id,
		username: user.username,
		name: user.name,
		notes: user.notes
	}
}



const User = mongoose.model('User', userSchema)

module.exports = User