import axios from 'axios';
import { 
  GET_LOADING, 
  GET_ADMIN,
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

export function CreateAdmin(payload) {
  return async dispatch => {
    dispatch(GetLoading())
    console.log('actions create admin', payload)
    await axios.post(`${serverAPI}/users`, payload)
    .then(res => {
      console.log('actions axios res', res)
      return res
    })
    .catch(err => {
      console.log('actions axios err', err)
      dispatch(GetError(err))
    })
  }
};

export function ReadAdmin() {
  const GetAdmins = (payload) => ({
    type: GET_ADMIN,
    payload: payload,
  });

  return async dispatch => {
    dispatch(GetLoading())
    await axios.get(`${serverAPI}/users`)
    .then(resp => {
      // console.log('action read admin', resp.data)
      dispatch(GetAdmins(resp.data))
    })
    .catch(err => {
      dispatch(GetError(err))
    })
  }
}

export function GetAdminLogin(email, password) {
  const GetAdminByUsername = (payload) => ({
    type: GET_ADMIN_BYUSERNAME,
    payload: payload,
  });

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
