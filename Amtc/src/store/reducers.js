import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import Auth from './auth/auth.reducers'

const reducers = combineReducers({
  auth: Auth,
  form: formReducer,
})

export default reducers
