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

const mostBlogs = (blogs) => {
	if (blogs == null || blogs.length == 0) {
		return null
	}

	const authorsArray = blogs.map(element => element.author)

	const mostOccuringAuthor = authorsArray
		.sort((a, b) => 
			authorsArray.filter(current => current === a).length
			- authorsArray.filter(current => current === b).length
		)
		.pop()

	const amountBlogsByAuthor = blogs
		.filter(element => element.author === mostOccuringAuthor)
		.length

	const author = { author: mostOccuringAuthor, blogs: amountBlogsByAuthor }
	return author
	// return { mostOccuringAuthor, amountBlogsByAuthor }

}

  
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}