import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setUserLogin } from '../../store/auth/auth.actions'

import Dashboard from '../Dashboard'
import Login from '../Login'

class Home extends Component {
  handleSubmit(itemData) {
    this.props.setUserLogin(itemData)
  }

  render() {
    const { loading, error, message, isUserLogin, userProfile } = this.props.auth
    // console.log('ISLOGIN HOME', isUserLogin)

    if (isUserLogin) {
      return <Dashboard userProfile={userProfile} />
    } else {
      return (
        <Login
          loading={loading}
          error={error}
          message={message}
          onSubmit={this.handleSubmit.bind(this)}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserLogin,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
