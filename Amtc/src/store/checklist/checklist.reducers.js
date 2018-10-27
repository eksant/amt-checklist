import {
  AUTH_EXPIRED_TOKEN,
  CHECKLIST_LOADING,
  CHECKLIST_ERROR,
  CHECKLIST_SUCCESS,
} from './checklist.actionType'

const initialState = {
  loading: false,
  error: false,
  expired: false,
  message: null,
  checklist: [],
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_EXPIRED_TOKEN:
      return {
        ...state,
        expired: true,
      }
    case CHECKLIST_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        expired: false,
        message: null,
      }
    case CHECKLIST_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        expired: false,
        message: action.payload,
      }
    case CHECKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        expired: false,
        message: null,
        checklist: action.payload,
      }
    default:
      return state
  }
}

export default reducers
