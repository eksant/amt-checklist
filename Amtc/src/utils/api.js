import config from '../config'
import { getAsyncToken } from './asyncToken'

const restApi = config.EndpointRestAPI
// const restHeader = {
//   // Origin: '',
//   // credentials: 'same-origin',
//   // Authorization: `Bearer ${JSON.stringify(token)}`,
//   token: getAsyncToken(),
//   Accept: 'application/json, application/xml, text/play, text/html, *.*',
//   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
// }

const searchParams = params =>
  Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    })
    .join('&')

export const apiGetData = async endpoint => {
  const token = await getAsyncToken()
  // console.log('TOKEN', token)

  return fetch(`${restApi}/${endpoint}`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      token: token,
      Accept: 'application/json, application/xml, text/play, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
  })
    .then(response => response.json())
    .then(data => {
      // console.log('GET RESPONSE DATA', data)
      return data
    })
    .catch(error => error)
}

export const apiSendData = async (endpoint, payload) => {
  const token = await getAsyncToken()
  // console.log('PAYLOAD', payload)
  // console.log('TOKEN', token)

  return fetch(`${restApi}/${endpoint}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      token: token,
      Accept: 'application/json, application/xml, text/play, text/html, *.*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: searchParams(payload),
  })
    .then(response => response.json())
    .then(data => {
      // console.log('SET RESPONSE DATA', data)
      return data
    })
    .catch(error => {
      return error
    })
}

export const apiPutData = (endpoint, payload) => {
  return fetch(`${restApi}/${endpoint}`, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: restHeader,
    body: searchParams(payload),
  })
    .then(response => response.json())
    .then(data => {
      // console.log('SET RESPONSE DATA', data)
      return data
    })
    .catch(error => {
      return error
    })
}
