const displayFilterReducer = (store = '', action) => {
	if (action.type==='SET_FILTER') {
        return action.searchTerm
	}

	return ''
}


export const filterChange = (searchTerm) => {
	return {
		type: 'SET_FILTER',
		searchTerm
	}
}

export default displayFilterReducer