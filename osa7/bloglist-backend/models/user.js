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
	},
	blogs: [
		{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
	]
})

userSchema.statics.format = (user) => {
	return {
		id: user.id,
		username: user.username,
		name: user.name,
		blogs: user.blogs
	}
}



const User = mongoose.model('User', userSchema)

module.exports = User