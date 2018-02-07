const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')


beforeAll(async () => {

    const multipleBlogs = [
        {
            title: 'React patterns',
            author: 'Michael Chan',
            url: 'https://reactpatterns.com/',
            likes: 7,
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
        },
        {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
        },
        {
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
            likes: 10,
        },
        {
            title: 'TDD harms architecture',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
            likes: 0,
        },
        {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2,
        }  
    ]

    await Blog.remove({}) // empty the DB

    const blogs = multipleBlogs.map(blog => new Blog(blog))
    const promiseArray = blogs.map(blog => blog.save()) // all promises in one
    await Promise.all(promiseArray)
})


describe('get blogs', () => {

    test('Blog posts are fetched. Correct amount and content type.', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(6)

        })

})

describe('create blogs', () => {

    test('Creating a new blog post', async () => {
        await api
            .post('/api/blogs')
            .send({ title: 'Subject', author: 'BlogTester', url: 'http://localhost', likes: 7 })
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(7)

        const authors = response.body.map(res => res.author)

        expect(authors).toContain('BlogTester')

    })

    test('Creating a new blog post with no likes', async () => {
        await api
            .post('/api/blogs')
            .send({ title: 'Subject', author: 'BlogTester', url: 'http://localhost' })
            .expect(201)
            .expect('Content-Type', /application\/json/)
            
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const lastBlog = response.body.pop()

        expect(lastBlog.likes).toBe(0)

    })

})

afterAll(() => {
  server.close()
})