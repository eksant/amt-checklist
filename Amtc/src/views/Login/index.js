import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { Item, Input, Button, Text, Spinner, Thumbnail } from 'native-base'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  UIManager,
  // KeyboardAvoidingView,
} from 'react-native'

import { setAsyncStorage } from '../../utils'
import { userLogin } from '../../store/auth/auth.actions'
import ConnectAlert from '../../components/ConnectAlert'

const window = Dimensions.get('window')
const { height, width } = window
const imgBackground = require('../../assets/img/background/background-1.jpg')
const logoDraconId = require('../../assets/img/brand/logo.jpg')

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit() {
    if (this.state.username === '' && this.state.password === '') {
      this.props.alertWithType('error', 'Error', 'Please input username & password!')
      return
    }

    if (this.state.username === '') {
      this.props.alertWithType('error', 'Error', 'Please input username!')
      return
    }

    if (this.state.password === '') {
      this.props.alertWithType('error', 'Error', 'Please input password!')
      return
    }

    const itemData = {
      username: this.state.username,
      password: this.state.password,
    }
    // console.log('ITEM DATA', itemData)
    this.props
      .userLogin(itemData)
      .then(resp => {
        // console.log('RESP', resp)
        if (resp.token) {
          Actions.replace('home')
        } else {
          this.props.alertWithType('error', 'Error', resp.error)
        }
      })
      .catch(err => {
        console.log('ERROR', err)
      })
  }

  render() {
    // console.log('PROPS LOGIN', this.props)
    const { loading } = this.props

    return (
      <View style={styles.container}>
        <ImageBackground source={imgBackground} style={styles.bgImage}>
          <View>
            {/* <KeyboardAvoidingView contentContainerStyle={styles.container} behavior="position"> */}
            <View style={styles.formContainer}>
              <View style={styles.titleContainer}>
                <View style={{ flexDirection: 'row' }}>
                  {/* <Text style={styles.titleText}>Login DraconId</Text> */}
                  <Thumbnail square source={logoDraconId} />
                </View>
              </View>

              <Item rounded style={styles.inputContainer}>
                <FAIcon active name="user" size={18} style={styles.inputIcon} />
                <Input
                  // value={username}
                  onChangeText={username => this.setState({ username })}
                  placeholder="Username.."
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  style={styles.inputText}
                />
              </Item>
              <Item rounded style={styles.inputContainer}>
                <FAIcon active name="lock" size={18} style={styles.inputIcon} />
                <Input
                  // value={password}
                  onChangeText={password => this.setState({ password })}
                  secureTextEntry={true}
                  placeholder="Password.."
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  style={styles.inputText}
                />
              </Item>

              <View style={styles.buttonContainer}>
                <Button
                  iconLeft
                  light
                  style={styles.buttonLoogin}
                  onPress={this.handleSubmit.bind(this)}
                >
                  {loading ? <Spinner color="white" size={16} style={styles.buttonIcon} /> : null}
                  <Text style={styles.buttonText}> Login </Text>
                </Button>
              </View>
            </View>
            {/* </KeyboardAvoidingView> */}
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#635DB7',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: 0.65,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleContainer: {
    // height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    // color: 'white',
    fontSize: 21,
    fontFamily: 'regular',
    fontWeight: 'bold',
    color: 'rgb(105,105,105)',
  },
  formContainer: {
    // top: height / 4,
    backgroundColor: 'white',
    width: width - 30,
    borderRadius: 10,
    // paddingTop: 20,
    // paddingBottom: 20,
    padding: 20,
    alignItems: 'center',
  },
  inputContainer: {
    height: 35,
    marginVertical: 5,
    backgroundColor: 'rgba(232, 147, 142, 0.70)',
  },
  inputIcon: {
    color: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  inputText: {
    fontSize: 14,
    paddingBottom: 5,
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginTop: 10,
  },
  buttonLoogin: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 40,
    height: 30,
    alignSelf: 'center',
    // width: 200,
  },
  buttonIcon: {
    paddingLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  messageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 30,
    width: width / 1.2,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  messageText: {
    color: 'white',
    fontSize: 12,
  },
})

// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//   }
// }

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      userLogin,
    },
    dispatch
  )

export default connect(
  null, //mapStateToProps,
  mapDispatchToProps
)(ConnectAlert(Login))
