import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const Menu = (state, addNew, notification) => {

    const { anecdotes } = state.state

    const anecdoteById = (id) => {
      const anecdote = anecdotes.find(anecdote => Number(anecdote.id) === Number(id))
      return anecdote
    }
    
    const menuStyle = {
      backgroundColor: 'cyan',
    }

    const menuItem = {
      paddingLeft: 3,
      paddingRight: 3,
      color: 'black'
    }

    const menuItemActive = {
      backgroundColor: 'black',
      color: 'cyan'
    }

    return (
      <div>
      <Router>
        <div>
          <div style={menuStyle}>
            <NavLink 
              exact
              to="/"
              style={menuItem}
              activeStyle={menuItemActive}
            >home</NavLink>
            <NavLink 
              exact
              to="/anecdotes"
              style={menuItem}
              activeStyle={menuItemActive}
            >anecdotes</NavLink>
            <NavLink 
              exact
              to="/create_new"
              style={menuItem}
              activeStyle={menuItemActive}
            >create new</NavLink>
            <NavLink 
              exact
              to="/about"
              style={menuItem}
              activeStyle={menuItemActive}
            >about</NavLink>
          </div>

          <Notification notification={state.notification} />

          <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
          <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={anecdotes} />} />
          <Route exact path="/anecdotes/:id" render={({match}) =>
            <Anecdote anecdote={anecdoteById(match.params.id)} />}
          />
          <Route path="/create_new" render={({history}) => 
            <CreateNew addNew={state.addNew} history={history} />} 
          />
          <Route path="/about" render={() => <About />} />
        </div>
      </Router>
    </div>
    );

}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink>
        </li>
      )}
    </ul>  
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </p>
  </div>
)

const Notification = ({ notification }) => {
 
  if (!notification) {
    return('')
  }

  const notificationStyle = {
    borderWidth: 5, 
    borderRadius: 10,
    borderColor: 'black',
    padding: 5,
    backgroundColor: 'green'
  }

  return(
    <div style={notificationStyle}>{notification}</div>
  )

  }



const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>
    
    <em>An anecdote is a brief, revealing account of an individual person or an incident. 
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }

  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })

    this.props.history.push('/')
  }

  render() {
    
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  notify = (text) => {
    this.setState({
      notification: text
    })

    setTimeout(() => {
      this.setState({
        notification: ''
      })
    }, 10000)

  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote) 
    })

    this.notify('A new anecdote was added!')
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {

    return (
      <div>
        <h1>Software anecdotes</h1>
          <Menu state={this.state} 
            addNew={(anecdote) => this.addNew(anecdote)}
            notification={this.state.notification}
          />
          <Footer />
      </div>
    );
  }
}

export default App;
