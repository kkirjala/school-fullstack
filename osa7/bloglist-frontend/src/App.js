import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '', 
      title: '',
      author: '',
      url: '',
      notification: null
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    this.fetchUsers()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  } 

  fetchUsers = async () => {
    const users = await userService.getAll()
    this.setState({ users: users })
  }

  notify = (message, type = 'info') => {
    this.setState({
      notification: {
        message, type
      }
    })
    setTimeout(() => {
      this.setState({
        notification: null
      })     
    }, 10000)
  }

  like = (id) => async () => {
    const liked = this.state.blogs.find(b=>b._id===id)
    const updated = { ...liked, likes: liked.likes + 1 }
    await blogService.update(id, updated)
    this.notify(`you liked '${updated.title}' by ${updated.author}`)
    this.setState({
      blogs: this.state.blogs.map(b => b._id === id ? updated : b)
    })
  }

  remove = (id) => async () => {
    const deleted = this.state.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if ( ok===false) {
      return
    }

    await blogService.remove(id)
    this.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
    this.setState({
      blogs: this.state.blogs.filter(b=>b._id!==id)
    })
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }
    
    const result = await blogService.create(blog) 
    this.notify(`blog '${blog.title}' by ${blog.author} added`)
    this.setState({ 
      title: '', 
      url: '', 
      author: '',
      blogs: this.state.blogs.concat(result)
    })
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.notify('logged out')
    this.setState({ user: null })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.notify('welcome back!')
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.notify('käyttäjätunnus tai salasana virheellinen', 'error')
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <Notification notification={this.state.notification} />
          <LoginForm handleLogin={this.login}
            handleLoginChange={this.handleLoginChange}
            username={this.state.username}
            password={this.state.password} 
          />         
        </div>
      )
    }


    return (      
      <div>
        <Notification notification={this.state.notification} />

        {this.state.user.name} logged in <button onClick={this.logout}>logout</button>

        <Togglable buttonLabel='uusi blogi'>
          <BlogForm 
            handleChange={this.handleLoginChange}
            title={this.state.title}
            author={this.state.author}
            url={this.state.url}
            handleSubmit={this.addBlog}
          />
        </Togglable>

        <Router>
          <div>
            <Route exact path="/" render={() => <BlogList blogs={this.state.blogs} handleLike={this.like} />} />
            <Route exact path="/blogs/:id" render={({match}) =>
              <Blog blog={this.state.blogs.find(b => b.id === Number(match.params.id))} />}
            />
            <Route exact path="/users" render={() => <UserList users={this.state.users} />}
            />
            <Route exact path="/users/:id" render={({match}) =>
              <User user={match.params.id} />}
            />
          </div>
        </Router>
        
      </div>
    );
  }
}

export default App