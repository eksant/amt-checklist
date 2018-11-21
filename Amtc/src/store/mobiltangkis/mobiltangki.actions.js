import { apiGetData, apiSendData, setAsyncToken, getAsyncToken, delAsyncToken } from '../../utils'
import {
  AUTH_EXPIRED_TOKEN,
  MOBILTANGKI_LOADING,
  MOBILTANGKI_ERROR,
  MOBILTANGKI_SUCCESS,
} from './mobiltangki.actionType'

const authExpiredToken = () => ({
  type: AUTH_EXPIRED_TOKEN,
})

const mobiltangkiLoading = () => ({
  type: MOBILTANGKI_LOADING,
})

const mobiltangkiError = payload => ({
  type: MOBILTANGKI_ERROR,
  payload,
})

const mobiltangkiSuccess = payload => ({
  type: MOBILTANGKI_SUCCESS,
  payload,
})

export const getMobilTangkiByNoPol = payload => {
  return dispatch => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

    dispatch(mobiltangkiLoading())
    if (format.test(payload)) {
      const resp = {
        status: 203,
        message: 'Data not found',
      }
      dispatch(mobiltangkiError(resp.message))
      return Promise.resolve(resp)
    } else {
      return apiGetData(`mobiltangkis/${payload}`)
        .then(resp => {
          // console.log('RESP', resp)
          if (resp.status === 200) {
            dispatch(mobiltangkiSuccess(resp.data))
          } else {
            dispatch(mobiltangkiError(resp.message))
          }
          return Promise.resolve(resp)
        })
        .catch(err => {
          // console.log('ERR', err)
          dispatch(mobiltangkiError(err.message))
          return Promise.reject(err)
        })
    }
  }
}
