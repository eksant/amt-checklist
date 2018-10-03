import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Text } from 'native-base'

// const { Dimensions } = React
// const deviceHeight = Dimensions.get('window').height

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#635DB7',
    width: null,
    height: null,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    width: 250,
    height: null,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 20, //deviceHeight / 5,
  },
  title: {
    flex: 1,
    color: '#D8D8D8',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})

export default Home
