if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
  
let nodePort = process.env.NODE_PORT
let mongoUrl = process.env.MONGODB_URI
  
if (process.env.NODE_ENV === 'test') {
	nodePort = process.env.TEST_NODE_PORT
	mongoUrl = process.env.TEST_MONGODB_URI
}
  
module.exports = {
	mongoUrl,
	nodePort
}