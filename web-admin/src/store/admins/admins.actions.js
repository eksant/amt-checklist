import axios from 'axios';
import { 
  GET_LOADING, 
  GET_ADMIN_BYUSERNAME,
  GET_ERROR
} from './admins.actionType';

const serverAPI = 'http://localhost:3030/api'

const GetLoading = () => ({
  type: GET_LOADING,
});

const GetError = (payload) => ({
  type: GET_ERROR,
});

const GetAdminByUsername = (payload) => ({
  type: GET_ADMIN_BYUSERNAME,
  payload: payload,
});

export function CreateAdmin(payload) {
  return dispatch => {
    dispatch(GetLoading())
    try {
      // console.log('actions CreateUser', payload)
      
    } catch (err) {
      dispatch(GetError(err))
    }
  }
};

export function GetAdminLogin(email, password) {
  return dispatch => {
    dispatch(GetLoading())
    axios.post(`${serverAPI}/users/auth`, {
      email: email,
      password: password
    })
    .then(resp => {
      console.log('action GetAdminLogin', resp)
      dispatch(GetAdminByUsername(resp))
    })
    .catch(err => {
      dispatch(GetError(err))
    })
  }
}
