/** @format */

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Root } from 'native-base'

import App from './App'
import { name as appName } from './app.json'
import store from './src/store/index'

class Front extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <App />
        </Provider>
      </Root>
    )
  }
}

// AppRegistry.registerComponent('frontend', () => Front)
AppRegistry.registerComponent(appName, () => Front)
