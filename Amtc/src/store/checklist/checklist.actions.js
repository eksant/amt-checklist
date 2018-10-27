import { apiGetData, apiSendData, setAsyncToken, getAsyncToken, delAsyncToken } from '../../utils'
import {
  AUTH_EXPIRED_TOKEN,
  CHECKLIST_LOADING,
  CHECKLIST_ERROR,
  CHECKLIST_SUCCESS,
} from './checklist.actionType'

const authExpiredToken = () => ({
  type: AUTH_EXPIRED_TOKEN,
})

const checklistLoading = () => ({
  type: CHECKLIST_LOADING,
})

const checklistError = payload => ({
  type: CHECKLIST_ERROR,
  payload,
})

const checklistSuccess = payload => ({
  type: CHECKLIST_SUCCESS,
  payload,
})

export const getChecklist = () => {
  return dispatch => {
    dispatch(checklistLoading())
    return apiGetData('checklist/user')
      .then(resp => {
        // console.log('RESP', resp)
        if (resp.status === 200) {
          dispatch(checklistSuccess(resp.data))
        } else {
          dispatch(checklistError(resp.message))
          if (resp.error.name === 'JsonWebTokenError') {
            delAsyncToken()
            dispatch(authExpiredToken())
          }
        }
        return Promise.resolve(resp)
      })
      .catch(err => {
        // console.log('ERR', err)
        dispatch(checklistError(err.message))
        return Promise.reject(err)
      })
  }
}
