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

export const userLogin = payload => {
  return dispatch => {
    dispatch(UserLoginLoading())
  }
}

export const userLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  }
}
