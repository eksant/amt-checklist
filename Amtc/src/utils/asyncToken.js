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
