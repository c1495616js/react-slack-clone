import * as actionTypes from '../actions/types'
import { combineReducers } from 'redux';

const initialUser = {
  currentUser: null,
  isLoading: true
}

const user_reducer = (state = initialUser, action) => {
  switch(action.type){
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        loading: false
      }
    case actionTypes.CLEAR_USER:
      return {
        ...initialUser,
        isLoading: false
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: user_reducer
})

export default rootReducer;