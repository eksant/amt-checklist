import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'
import { Container, Text } from 'native-base'

import { setUserLogout } from '../../store/auth/auth.actions'

class Logout extends Component {
  render() {
    return (
      <Container>
        <View>
          <Text>Logout</Text>
        </View>
      </Container>
    )
  }

  componentDidMount() {
    this.props.setUserLogout()
    this.props.navigation.navigate('Home')

    // setTimeout(() => {
    // }, 1000)
  }
}

// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//   }
// }

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUserLogout,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(Logout)
