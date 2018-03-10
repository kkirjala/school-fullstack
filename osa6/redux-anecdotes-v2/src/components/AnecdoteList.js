import React from 'react'
import { voteRegistration } from '../reducers/anecdoteReducer'
import { notificationActivation, notificationDeactivation } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
	render() {
		
		const anecdotes = this.props.store.getState().anecdotes
		const filterSearchTerm = this.props.store.getState().displayFilter
		const filteredAnecdotes = anecdotes
			.filter(a => a.content
				.toLowerCase()
				.indexOf(filterSearchTerm.toLowerCase()) > -1)

		return (
			<div>
				<div>
				{filteredAnecdotes
					.sort((a, b) => b.votes - a.votes)
					.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
              has {anecdote.votes}
							<button onClick={() => {
								this.props.store.dispatch(voteRegistration(anecdote.id))                

								this.props.store.dispatch(notificationActivation('A vote was cast!'))
								setTimeout(() => {
									this.props.store.dispatch(notificationDeactivation())
								}, 5000)
								
							}}>	vote
							</button>
						</div>
					</div>
				)}
				</div>
			</div>
		)
	}
}

export default AnecdoteList
