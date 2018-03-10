import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anecdoteReducer, { anecdoteInitialization } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import displayFilterReducer from './reducers/displayFilterReducer'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	displayFilter: displayFilterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

anecdoteService.getAll().then(anecdotes => 
	store.dispatch(anecdoteInitialization(anecdotes))
)

export default store