import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Container, Text } from 'native-base'

import styles from './styles'

const logoPertamina = require('../../assets/img/brand/logo-symbol.png')

class Splash extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logoPertamina} style={styles.logo} />
          <Text style={styles.title}>DAILY CHECKLIST</Text>
          {setTimeout(() => {
            this.props.navigation.navigate('Login')
          }, 2000)}
        </View>
      </Container>
    )
  }
}

export default Splash
