import React from 'react'
import { connect } from 'react-redux'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

class App extends React.Component {

	componentDidMount () {
		this.props.anecdoteInitialization()
	}


	render() {
		return (
			<div>
				<h1>Programming anecdotes</h1>
				<Notification />

				<h2>Anecdotes</h2>
				<Filter />
				<AnecdoteList />
				<AnecdoteForm />
			</div>
		)
	}
}

export default connect(
	null, { anecdoteInitialization }
)(App)