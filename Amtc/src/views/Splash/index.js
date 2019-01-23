import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dimensions, StyleSheet, BackHandler, Text, View, Image, Alert } from 'react-native'
import { Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
// import * as Progress from 'react-native-progress'

import { getAsyncToken } from '../../utils'
import { getChecklist } from '../../store/checklist/checklist.actions'

const deviceHeight = Dimensions.get('window').height
const logoPertamina = require('../../assets/img/brand/logo-patraniaga.png')

class Splash extends Component {
  constructor() {
    super()

    this.state = {
      isVisible: true,
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed)
  }

  async componentDidMount() {
    let self = this

    setTimeout(() => {
      self.handleCloseSplashScreen()
    }, 2000)
  }

  async handleCloseSplashScreen() {
    await this.setState({ isVisible: false })

    const resp = await this.props.getChecklist()
    if (Object.keys(resp).length === 0) {
      Alert.alert(
        'Check Your Connection!',
        'This app can only be used in the depot area!',
        [{ text: 'Close', onPress: () => BackHandler.exitApp() }],
        { cancelable: false }
      )
      return true
    } else {
      if (resp.error && resp.error.name === 'TokenExpiredError') {
        Actions.replace('login')
      } else {
        const token = await getAsyncToken()
        token ? Actions.replace('home') : Actions.replace('login')
      }
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logoPertamina} style={styles.logo} />
          <Text style={styles.title}>DAILY CHECKLIST</Text>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#635DB7',
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
    width: 350,
    // height: null,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: deviceHeight / 5,
  },
  title: {
    flex: 1,
    color: '#D8D8D8',
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})

const mapStateToProps = state => {
  return {
    checklist: state.checklist,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getChecklist,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash)
