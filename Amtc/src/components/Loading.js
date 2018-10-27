import React from 'react'
import { ActivityIndicator } from 'react-native'

const Loading = ({ loadingSize, colorLoading }) => {
  return (
    <ActivityIndicator
      size={loadingSize ? loadingSize : 'small'}
      color={colorLoading ? colorLoading : 'blue'}
    />
  )
}

export default Loading
