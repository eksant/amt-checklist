import { apiSendData, setAsyncToken, getAsyncToken, setAsyncStorage } from '../../utils'
import {
  AUTH_EXPIRED_TOKEN,
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
} from './auth.actionType'

const authExpiredToken = payload => ({
  type: AUTH_EXPIRED_TOKEN,
  payload,
})

const authLoginLoading = () => ({
  type: AUTH_LOGIN_LOADING,
})

const authLoginError = payload => ({
  type: AUTH_LOGIN_ERROR,
  payload,
})

const authLoginSuccess = payload => ({
  type: AUTH_LOGIN_SUCCESS,
  payload,
})

export const userLogin = payload => {
  return dispatch => {
    dispatch(authLoginLoading())
    // console.log('PAYLOAD', payload)
    return apiSendData('signin', payload)
      .then(async resp => {
        // console.log('RESP', resp)
        if (resp.token) {
          await setAsyncToken(resp.token)
          await setAsyncStorage('user-fullname', resp.user.fullName)
          await setAsyncStorage('user-roles', resp.user.roles)
          dispatch(authLoginSuccess(resp.user))
          dispatch(authExpiredToken(resp.expired))
        } else {
          dispatch(authLoginError(resp.error))
        }
        return Promise.resolve(resp)
      })
      .catch(err => {
        // console.log('ERR', err)
        dispatch(authLoginError(err.message))
        return Promise.reject(err)
      })
  }
}

export const getUserLogin = () => {
  return dispatch => {
    getAsyncToken()
      .then(token => {
        // console.log('TOKEN', token)
        if (token) {
          dispatch(authLoginSuccess())
        } else {
          // dispatch(authLoginError('You Must to Login!'))
        }
      })
      .catch(err => {
        // console.log('ERR', err.message)
        dispatch(authLoginError(err.message))
      })
  }
}
