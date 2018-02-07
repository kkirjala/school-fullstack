const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

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
		const singleBlog = []
		singleBlog.push(testHelper.initialBlogs[0])

		const result = listHelper.totalLikes(singleBlog)
		expect(result).toBe(7)
	})

	test('multiple blog posts', () => {		
		const result = listHelper.totalLikes(testHelper.initialBlogs)
		expect(result).toBe(36)
	})
})

describe('favorite blogs by likes', () => {
	test('empty list returns null', () => {
		const emptyList = []

		const result = listHelper.favoriteBlog(emptyList)
		expect(result).toBe(null)
	})

	test('a list with one blog returns the one blog', () => {
		const singleList = []
		singleList.push(testHelper.initialBlogs[0])

		const result = listHelper.favoriteBlog(singleList)

		const correctResult = {'author': 'Michael Chan', 'likes': 7, 'title': 'React patterns'}
		expect(result).toEqual(correctResult)
	})

	test('return the blog with most likes', () => {

		const result = listHelper.favoriteBlog(testHelper.initialBlogs)
		const correctResult = {'author': 'Edsger W. Dijkstra', 'likes': 12, 'title': 'Canonical string reduction'}

		expect(result).toEqual(correctResult)
	})
})

describe('most blog posts by author', () => {

	test('empty list returns null', () => {
		const emptyArray = []

		const result = listHelper.mostBlogs(emptyArray)
		expect(result).toBe(null)
		
	})

	test('a list with one item returns the correct author', () => {
		const singleList = []
		singleList.push(testHelper.initialBlogs[0])
		const result = listHelper.mostBlogs(singleList)
		expect(result).toEqual({'author': 'Michael Chan', 'blogs': 1})
		
	})

	test('multiple blog posts returns the correct author', () => {
		const result = listHelper.mostBlogs(testHelper.initialBlogs)
		expect(result).toEqual({'author': 'Robert C. Martin', 'blogs': 3})
	})

})

describe('most likes by author', () => {

	test('empty list returns null', () => {
		const emptyArray = []

		const result = listHelper.mostLikes(emptyArray)
		expect(result).toBe(null)
		
	})

	test('a list with one item returns the correct author', () => {
		const singleList = []
		singleList.push(testHelper.initialBlogs[0])

		const result = listHelper.mostLikes(singleList)
		expect(result).toEqual({'author': 'Michael Chan', 'likes': 7})
		
	})

	test('multiple blog posts returns the correct author', () => {
		const result = listHelper.mostLikes(testHelper.initialBlogs)
		expect(result).toEqual({'author': 'Edsger W. Dijkstra', 'likes': 17})

	})





})