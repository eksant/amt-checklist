import React, { Component } from 'react'
import { Dimensions, Platform, StyleSheet, View } from 'react-native'
import { Container, Button, H3, Form, Item, Input, Text, Label } from 'native-base'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

import { postUserLogin } from '../../store/auth/auth.actions'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

class Login extends Component {
  constructor() {
    super()

    this.state = {
      isUserLogin: false,
    }
  }

  // async componentDidMount() {
  //   let hasLogin = await this.props.isUserLogin
  //   this.setState({ isUserLogin: hasLogin })
  // }

  handleSubmit(e) {
    const { postUserLogin } = this.props
    let payload = {
      username: '',
      password: '',
    }

    postUserLogin(payload)
  }

  render() {
    // const { isUserLogin } = this.state
    const { isUserLogin, navigation } = this.props

    return isUserLogin ? (
      navigation.navigate('Home')
    ) : (
      <Container style={styles.container}>
        <View>
          <Form style={styles.form}>
            <H3 style={styles.title}>Login Daily Checklist</H3>
            <Item floatingLabel>
              <Label style={styles.textWhite}>Username</Label>
              <Input style={styles.textWhite} />
            </Item>
            <Item floatingLabel>
              <Label style={styles.textWhite}>Password</Label>
              <Input secureTextEntry={true} style={styles.textWhite} />
            </Item>
            <Button iconLeft light style={styles.buttonLogin} onPress={e => this.handleSubmit(e)}>
              <Icon name="sign-in" size={20} style={{ left: 10 }} />
              <Text>Login</Text>
            </Button>
          </Form>
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
  form: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    paddingRight: 30,
    width: deviceWidth - 50,
    marginTop: deviceHeight / 4,
    left: Platform.OS === 'android' ? 25 : 25,
    backgroundColor: 'rgba(247, 247, 247, 0.2)',
  },
  title: {
    alignSelf: 'center',
    color: '#FFF',
  },
  textWhite: {
    color: '#FFF',
  },
  textGrey: {
    color: '#454545',
  },
  buttonLogin: {
    marginTop: 30,
    alignSelf: 'center',
    // width: 150,
  },
})

function mapStateToProps(state) {
  return {
    isUserLogin: state.auth.isUserLogin,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postUserLogin: payload => dispatch(postUserLogin(payload)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
