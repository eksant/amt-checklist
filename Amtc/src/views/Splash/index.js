import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import { Container } from 'native-base'
import { Actions } from 'react-native-router-flux'
// import * as Progress from 'react-native-progress'

import { getAsyncToken } from '../../utils'
import { getChecklist } from '../../store/checklist/checklist.actions'

const deviceHeight = Dimensions.get('window').height
const logoPertamina = require('../../assets/img/brand/logo-symbol.png')

class Splash extends Component {
  constructor() {
    super()

    this.state = {
      isVisible: true,
    }
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
    // console.warn(resp)
    if (Object.keys(resp).length === 0) {
      alert('Check your connection!')
    } else {
      if (resp.error && resp.error.name === 'TokenExpiredError') {
        Actions.replace('login')
      } else {
        const token = await getAsyncToken()
        token ? Actions.replace('home') : Actions.replace('login')
      }
    }
  }

  // constructor(props) {
  //   super(props)

  //   this.iSMounted = false
  //   this.state = {
  //     progress: 0,
  //     indeterminate: true,
  //   }
  // }

  // componentDidMount() {
  //   this.iSMounted = true
  //   if (this.iSMounted) {
  //     this.animate()
  //   }
  // }

  // componentWillUnmount() {
  //   this.iSMounted = false
  // }

  // animate() {
  //   let progress = 0
  //   this.setState({ progress })
  //   setTimeout(() => {
  //     this.setState({ indeterminate: false })
  //     setInterval(() => {
  //       progress += Math.random() / 5
  //       if (this._isMounted) {
  //         this.setState({ progress })
  //       }

  //       if (progress > 1) {
  //         this._isMounted = false
  //         progress = 1
  //         this.props.navigation.navigate('Login')
  //       }
  //     }, 200)
  //   }, 100)
  // }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.logoContainer}>
          {/* <Progress.Bar
            progress={this.state.progress}
            indeterminate={this.state.indeterminate}
            color="#5DADE2"
            width={400}
          /> */}
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
    width: 250,
    height: null,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: deviceHeight / 5,
  },
  title: {
    flex: 1,
    color: '#D8D8D8',
    fontSize: 25,
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
