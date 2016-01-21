import { SAVE_MATCH_DATA, SAVE_INPUT, SEND_MESSAGE, LOGOUT } from '../constants/Match_ActionTypes'

const initialState = {

}

export default function Match(state = initialState, action) {
  switch (action.type) {
  	case SAVE_MATCH_DATA:
    	var newState = Object.assign({}, state)
    	newState.data = action.data
     	return newState


	case SAVE_INPUT:
		var newState = Object.assign({}, state)
		newState.message = action.value
		return newState


    case SEND_MESSAGE:
      var newState = Object.assign({}, state)
    	console.log('sending message...')
    	return newState


    case LOGOUT:
      var newState = Object.assign({}, state)

      // Gather User ID and Session Token from Local Storage
      var userData = window.localStorage.getItem('GoodEnough')
      // Make server request to delete token storage on server side
      fetch('http://localhost:4000/app/users/logout', {
        method: 'post',
        headers: {
          'mode': 'no-cors',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(JSON.parse(userData))
      })

      // Remove local storage ID and Token
      window.localStorage.removeItem('GoodEnough');

      // Reset Initial Profile State (for if a different user logs on right after logout)
      newState = {};
      return newState


    default:
    	return state
  }
}
