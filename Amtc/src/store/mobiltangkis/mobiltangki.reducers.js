import {
  AUTH_EXPIRED_TOKEN,
  MOBILTANGKI_LOADING,
  MOBILTANGKI_ERROR,
  MOBILTANGKI_SUCCESS,
} from './mobiltangki.actionType'

const initialState = {
  loading: false,
  error: false,
  expired: false,
  message: null,
  mobiltangkis: [],
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_EXPIRED_TOKEN:
      return {
        ...state,
        expired: true,
      }
    case MOBILTANGKI_LOADING:
      return {
        ...state,
        loading: true,
        error: false,
        message: null,
      }
    case MOBILTANGKI_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      }
    case MOBILTANGKI_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        message: null,
        mobiltangkis: action.payload,
      }
    default:
      return state
  }
}

export default reducers
