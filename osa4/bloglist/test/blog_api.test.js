const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const testHelper = require('./test_helper')
const Blog = require('../models/blog')


beforeAll(async () => {

    await Blog.remove({}) // empty the DB

    const blogs = testHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogs.map(blog => blog.save()) // all promises in one
    await Promise.all(promiseArray)
})


describe('create blogs', () => {

    test('Creating a new blog post', async () => {

        const origBlogs = await testHelper.blogsInDb()

        await api
            .post('/api/blogs')
            .send({ title: 'Subject', author: 'BlogTester', url: 'http://localhost', likes: 7 })
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(origBlogs.length + 1)

        const authors = response.body.map(res => res.author)

        expect(authors).toContain('BlogTester')

    })

    test('Creating a new blog post with no likes', async () => {

        const origBlogs = await testHelper.blogsInDb()

        await api
            .post('/api/blogs')
            .send({ title: 'Subject', author: 'BlogTester', url: 'http://localhost' })
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(origBlogs.length + 1)

        const lastBlog = response.body.pop()

        expect(lastBlog.likes).toBe(0)

    })

    test('Creating a new blog without title and url', async () => {
        const origBlogs = await testHelper.blogsInDb()

        await api
            .post('/api/blogs')
            .send({ author: 'BlogTester', likes: 10 })
            .expect(400)

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(origBlogs.length)
        
    })



})


describe('get blogs', () => {

    test('Blog posts are fetched. Correct amount and content type.', async () => {

        const origBlogs = await testHelper.blogsInDb()

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(origBlogs.length)

        })

})

afterAll(() => {
  server.close()
})