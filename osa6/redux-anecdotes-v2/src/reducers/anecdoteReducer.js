import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
	if (action.type==='VOTE') {
		const old = store.filter(a => a.id !==action.id)
		const voted = store.find(a => a.id === action.id)

		return [...old, { ...voted, votes: action.votes } ]
	}
	if (action.type === 'CREATE') {
		return [...store, action.content ]
	}
	if (action.type === 'INIT_ANECDOTES') {
		return action.data
	}

	return store
}

/*
export const voteRegistration = (content) => {
	return {
		type: 'VOTE',
		id: content.id,
		votes: content.votes
	}
}
*/

export const voteRegistration = (id, votes) => {
	return async (dispatch) => {
		const content = await anecdoteService.registerVote(id, votes+1)
		dispatch({
			type: 'VOTE',
			id: content.id,
			votes: content.votes
		})
	}
}

export const anecdoteCreation = (anecdote) => {
	return async (dispatch) => {
		const content = await anecdoteService.createNew(anecdote)
		dispatch({
			type: 'CREATE',
			content
		})
	}
}

export const anecdoteInitialization = () => {
	return async (dispatch) => {
	  const anecdotes = await anecdoteService.getAll()
	  dispatch({
		type: 'INIT_ANECDOTES',
		data: anecdotes
	  })
	}
  }


export default reducer