import { createStore, combineReducers } from 'redux'
import anecdoteReducer, { anecdoteCreation } from './reducers/anecdoteReducer'
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
		store.dispatch(anecdoteCreation(anecdote.content))
	}))

export default store