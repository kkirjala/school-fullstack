const getId = () => (100000*Math.random()).toFixed(0)


const initialNotification = {
	id: getId(),
	text: 'Welcome! Have a look at these great anecdotes.'
}



const notificationReducer = (store = initialNotification, action) => {
	switch (action.type) {
	case 'ACTIVATE_NOTIFICATION':
		return { id: getId(), text: action.text }
	case 'DEACTIVATE_NOTIFICATION':	
		return { id: getId(), text: '' }
	default:
		return store
	}
}

export const notificationActivation = (notificationText) => {
	return {
		type: 'ACTIVATE_NOTIFICATION',
		text: notificationText
	}
}

export const notificationDeactivation = () => {
	return {
		type: 'DEACTIVATE_NOTIFICATION'
	}
}

export default notificationReducer