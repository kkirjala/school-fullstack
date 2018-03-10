import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import displayFilterReducer from './reducers/displayFilterReducer'

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	displayFilter: displayFilterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store