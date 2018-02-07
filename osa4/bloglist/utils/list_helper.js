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

	const blogsCopy = [...blogs] // in order to avoid mutating the original array

	const favoriteBlog = blogsCopy
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

}

const mostLikes = (blogs) => {

	if (blogs == null || blogs.length == 0) {
		return null
	}
	
	const authors = blogs.map(blog => blog.author)

	const mostLikedAuthor = authors
		.sort((a, b) => {
			return (
				blogs
					.filter(blog => blog.author === a) // only author A
					.map(blog => blog.likes) // build an array with likes by author A
					.reduce((total, currBlog) => { return total + currBlog }, 0) // calculate total for author A
				- blogs // compare with equal calculation results of author B
					.filter(blog => blog.author === b)
					.map(blog => blog.likes)
					.reduce((total, currBlog) => { return total + currBlog }, 0)
			)
		})
		.pop()

	// TODO: remove copy-paste (see above)
	const amountLikesByAuthor = blogs
		.filter(blog => blog.author === mostLikedAuthor)
		.map(blog => blog.likes)
		.reduce((total, currBlog) => { return total + currBlog }, 0)

	const author = { author: mostLikedAuthor, likes: amountLikesByAuthor }
	return author

}

  
module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}