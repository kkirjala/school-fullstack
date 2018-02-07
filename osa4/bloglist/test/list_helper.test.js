const listHelper = require('../utils/list_helper')

describe('dummy tests', () => {
	test('dummy is called', () => {
		const blogs = []

		const result = listHelper.dummy(blogs)
		expect(result).toBe(1)
	})
})

describe('total likes', () => {

	test('empty list return zero', () => {
		const emptyArray = []

		const result = listHelper.totalLikes(emptyArray)
		expect(result).toBe(0)
		
	})

	test('single blog post', () => {
		const singleBlog = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 17,
				__v: 0
			}
		]

		const result = listHelper.totalLikes(singleBlog)
		expect(result).toBe(17)
	})

	test('multiple blog posts', () => {
		const multipleBlogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 5,
				__v: 0
			},
			{
				_id: '5a422b3a1b54a676234d17f9',
				title: 'Canonical string reduction',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
				likes: 12,
				__v: 0
			},
			{
				_id: '5a422b891b54a676234d17fa',
				title: 'First class tests',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
				likes: 10,
				__v: 0
			},
			{
				_id: '5a422ba71b54a676234d17fb',
				title: 'TDD harms architecture',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
				likes: 0,
				__v: 0
			},
			{
				_id: '5a422bc61b54a676234d17fc',
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
				__v: 0
			}  
		]

		const result = listHelper.totalLikes(multipleBlogs)
		expect(result).toBe(36)

	})
})

describe('favorite blogs', () => {
	test('empty list returns null', () => {
		const emptyList = []

		const result = listHelper.favoriteBlog(emptyList)
		expect(result).toBe(null)
	})

	test('a list with one blog returns the one blog', () => {
		const singleList = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0
			}
		]

		const result = listHelper.favoriteBlog(singleList)

		const correctResult = {'author': 'Michael Chan', 'likes': 7, 'title': 'React patterns'}
		expect(result).toEqual(correctResult)
	})

	test('return the blog with most likes', () => {
		const multipleBlogs = [
			{
				_id: '5a422a851b54a676234d17f7',
				title: 'React patterns',
				author: 'Michael Chan',
				url: 'https://reactpatterns.com/',
				likes: 7,
				__v: 0
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Go To Statement Considered Harmful',
				author: 'Edsger W. Dijkstra',
				url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
				likes: 15,
				__v: 0
			},
			{
				_id: '5a422b891b54a676234d17fa',
				title: 'First class tests',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
				likes: 10,
				__v: 0
			}
		]

		const result = listHelper.favoriteBlog(multipleBlogs)
		const correctResult = {'author': 'Edsger W. Dijkstra', 'likes': 15, 'title': 'Go To Statement Considered Harmful'}

		expect(result).toEqual(correctResult)
	})
})