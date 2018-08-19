import { 
  GET_LOADING, 
  GET_ADMIN,
  GET_ADMIN_BYUSERNAME, 
  GET_ERROR
} from './admins.actionType';

const initialState = {
  loading: false,
  error: false,
  isLogin: false,
  datas: []
};

const reducers = (state = {...initialState}, action) => {
  switch (action.type) {
    case GET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_ADMIN:
      // console.log('reducers get admin', action.payload)
      return {
        ...state,
        datas: action.payload,
        loading: false
      }
    case GET_ADMIN_BYUSERNAME:
      // console.log('reducers GET_ADMIN_BYUSERNAME: ', action.payload)
      return {
        ...state,
        datas: action.payload,
        loading: false,
      }
    case GET_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
      }
    default:
      return state;
  }
}

export default reducers;