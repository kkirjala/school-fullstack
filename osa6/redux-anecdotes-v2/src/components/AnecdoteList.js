import React from 'react'
import { connect } from 'react-redux'
import { voteRegistration } from '../reducers/anecdoteReducer'
import { notificationActivation, notificationDeactivation } from '../reducers/notificationReducer'
import { registerVote } from '../services/anecdotes'

class AnecdoteList extends React.Component {
	render() {
		
		const anecdotes = this.props.anecdotes

		const handleVoteButton = async (id, votes) => {
			
			const updatedAnecdote = await registerVote(id, votes+1)

			this.props.voteRegistration(updatedAnecdote)

			this.props.notificationActivation('A vote was cast!')
			setTimeout(() => {
				this.props.notificationDeactivation()
			}, 5000)
		}

		return (
			<div>
				<div>
					{anecdotes
						.sort((a, b) => b.votes - a.votes)
						.map(anecdote =>
							<div key={anecdote.id}>
								<div>
									{anecdote.content}
								</div>
								<div>
              has {anecdote.votes}
									<button onClick={() => handleVoteButton(anecdote.id, anecdote.votes)}>vote</button>
								</div>
							</div>
						)}
				</div>
			</div>
		)
	}
}

const filteredAnecdotes = (anecdotes, filterSearchTerm) => {
	return anecdotes
		.filter(a => a.content
			.toLowerCase()
			.indexOf(filterSearchTerm.toLowerCase()) > -1)
}

const mapStateToProps = (state) => {
	return {
		anecdotes: filteredAnecdotes(state.anecdotes, state.displayFilter)
	}	
}

const mapDispatchToProps = {
	voteRegistration,
	notificationActivation,
	notificationDeactivation
}

const ConnectedAnecdoteList = connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList