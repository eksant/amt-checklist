import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Container, Text } from 'native-base'

import styles from './styles'

class Home extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>HOME</Text>
        </View>
      </Container>
    )
  }
}

export default Home
