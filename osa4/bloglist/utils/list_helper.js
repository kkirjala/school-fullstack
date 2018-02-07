const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {

	return blogs
		.map(element => element.likes)
		.reduce((total, curr) => { return total + curr }, 0)

}
  
module.exports = {
	dummy,
	totalLikes
}