import {
  AUTH_EXPIRED_TOKEN,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
} from './auth.actionType'

const initialState = {
  loading: false,
  error: false,
  message: null,
  userProfile: null,
  exptoken: null,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_EXPIRED_TOKEN:
      return {
        ...state,
        exptoken: action.payload,
      }
    case AUTH_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        userProfile: null,
        message: null,
      }
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        userProfile: null,
        message: action.payload,
      }
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        userProfile: action.payload,
        message: null,
      }
    default:
      return state
  }
}

export default reducers
