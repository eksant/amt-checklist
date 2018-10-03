import {
  USER_LOGIN_LOADING,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from './auth.actionType'

const UserLoginLoading = () => ({
  type: USER_LOGIN_LOADING,
})

const UserLoadingError = payload => ({
  type: USER_LOGIN_ERROR,
  payload,
})

const UserLoginSuccess = payload => ({
  type: USER_LOGIN_SUCCESS,
  payload: payload,
})

export const postUserLogin = payload => {
  return dispatch => {
    // dispatch(UserLoginLoading())
    dispatch(UserLoginSuccess())
  }
}

export const userLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  }
}
