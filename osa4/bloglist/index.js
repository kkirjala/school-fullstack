const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs.js')
const mongoose = require('mongoose')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

const server = http.createServer(app)

server.listen(config.nodePort, () => {
	console.log(`Server running on port ${config.nodePort}`)
})

server.on('close', () => {
	mongoose.connection.close()
})
  
module.exports = {
	app, server
}