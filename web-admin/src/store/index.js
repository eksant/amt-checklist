import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import adminReducers from './admins/admins.reducers';

const reducers = combineReducers({
  admins: adminReducers,
});

const store = createStore(
  reducers, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default store;