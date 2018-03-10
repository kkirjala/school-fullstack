import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import displayFilterReducer from './reducers/displayFilterReducer'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	displayFilter: displayFilterReducer
})

const store = createStore(reducer)

anecdoteService.getAll().then(anecdotes => 
	anecdotes.forEach(anecdote => {
		store.dispatch({ type: CREATE, content: content })
	}))

export default store