import { combineReducers } from 'redux'

import auth from './auth/auth.reducers'
import checklist from './checklist/checklist.reducers'

const reducers = combineReducers({
  auth,
  checklist,
})

export default reducers
