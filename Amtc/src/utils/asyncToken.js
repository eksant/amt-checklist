import { AsyncStorage } from 'react-native'

const tokenName = process.env.TOKEN_NAME || 'amtc-token'

export const setAsyncToken = async payload => {
  try {
    await AsyncStorage.setItem(tokenName, payload)
  } catch (error) {
    console.log('AsyncStorage Error', error.message)
  }
}

export const getAsyncToken = async () => {
  try {
    return await AsyncStorage.getItem(tokenName)
  } catch (error) {
    console.log('AsyncStorage Error', error.message)
  }
}

export const delAsyncToken = async () => {
  try {
    return await AsyncStorage.removeItem(tokenName)
  } catch (error) {
    console.log('AsyncStorage Error', error.message)
  }
}

export const setAsyncStorage = async (storageName, payload) => {
  try {
    await AsyncStorage.setItem(storageName, payload)
  } catch (error) {
    console.log('AsyncStorage Error', error.message)
  }
}

export const getAsyncStorage = async storageName => {
  try {
    return await AsyncStorage.getItem(storageName)
  } catch (error) {
    console.log('AsyncStorage Error', error.message)
  }
}

export const delAsyncStorage = async storageName => {
  try {
    return await AsyncStorage.removeItem(storageName)
  } catch (error) {
    console.log('AsyncStorage Error', error.message)
  }
}
