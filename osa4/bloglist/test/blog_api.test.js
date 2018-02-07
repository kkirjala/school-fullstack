const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

describe('get blogs', () => {

    test('Blog posts are fetched. Content-type JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

})

afterAll(() => {
  server.close()
})