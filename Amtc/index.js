import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { Root } from 'native-base'

import App from './App'
import { name as appName } from './app.json'
import store from './src/store/index'

class AmtcFront extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <App />
        </Root>
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => AmtcFront)
