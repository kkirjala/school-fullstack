const getId = () => (100000*Math.random()).toFixed(0)

const reducer = (store = [], action) => {
	if (action.type==='VOTE') {
		const old = store.filter(a => a.id !==action.id)
		const voted = store.find(a => a.id === action.id)

		return [...old, { ...voted, votes: voted.votes+1} ]
	}
	if (action.type === 'CREATE') {

		return [...store, { content: action.content, id: getId(), votes:0 }]
	}

	return store
}

export const voteRegistration = (id) => {
	return {
		type: 'VOTE',
		id: id
	}
}

export const anecdoteCreation = (content) => {
	return {
		type: 'CREATE',
		content: content
	}
}



export default reducer