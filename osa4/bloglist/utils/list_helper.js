const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {

	return blogs
		.map(element => element.likes)
		.reduce((total, curr) => { return total + curr }, 0)

}

const favoriteBlog = (blogs) => {

	if (blogs == null || blogs.length == 0) {
		return null
	}

	const favoriteBlog = blogs
		.sort((a, b) => a.likes - b.likes) 
		.pop()

	const { author, title, likes } = favoriteBlog
	const subsetProps = { author, title, likes }

	return subsetProps

}

  
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}