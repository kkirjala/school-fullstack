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

export const voteRegistration = (content) => {
	return {
		type: 'VOTE',
		id: content.id,
		votes: content.votes
	}
}

export const anecdoteCreation = (content) => {
	return {
		type: 'CREATE',
		content
	}
}

export const anecdoteInitialization = (data) => {
	return {
		type: 'INIT_ANECDOTES',
		data
	}
}



export default reducer