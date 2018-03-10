import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationActivation, notificationDeactivation } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    e.persist()

    const content = e.target.anecdote.value
    this.props.anecdoteCreation(content)
  
    e.target.anecdote.value = ''

    this.props.notificationActivation('A new anecdote was added!')
    setTimeout(() => {
      this.props.notificationDeactivation()
    }, 5000)

  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

const mapDispatchToProps = {
    anecdoteCreation,
    notificationActivation,
    notificationDeactivation
}


const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)


export default ConnectedAnecdoteForm
