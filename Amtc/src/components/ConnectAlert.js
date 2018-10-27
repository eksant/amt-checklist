import React, { Component } from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatic from 'hoist-non-react-statics'

const ConnectAlert = WrappedComponent => {
  class ConnectedAlert extends Component {
    render() {
      const { props, context } = this
      return (
        <WrappedComponent {...props} alertWithType={context.alertWithType} alert={context.alert} />
      )
    }
  }

  ConnectedAlert.contextTypes = {
    alertWithType: PropTypes.func,
    alert: PropTypes.func,
  }

  return hoistNonReactStatic(ConnectedAlert, WrappedComponent)
}

export default ConnectAlert
