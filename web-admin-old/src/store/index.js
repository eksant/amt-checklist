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

// import { applyMiddleware, createStore, compose } from 'redux';
// import { createEpicMiddleware } from 'redux-observable';
// import { hashHistory } from 'react-router';
// import { routerMiddleware } from 'react-router-redux';
// import createLogger from 'redux-logger';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
// import rootEpic from './epics';

// const logger = createLogger({collapsed: true});

// const epicMiddleware = createEpicMiddleware(rootEpic);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default createStore(
//   rootReducer,
//   composeEnhancers(
//     applyMiddleware(
//       epicMiddleware,
//       logger,
//       routerMiddleware(hashHistory),
//       thunk,
//     )
//   )
// );
