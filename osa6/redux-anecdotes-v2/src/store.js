import { createStore, combineReducers } from 'redux'
import anecdoteReducer, { anecdoteInitialization } from './reducers/anecdoteReducer'
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
	store.dispatch(anecdoteInitialization(anecdotes))
)

export default store