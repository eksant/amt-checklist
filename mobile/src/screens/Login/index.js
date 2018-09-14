import React, { Component } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Container, Button, H3, Form, Item, Input, Label, Text } from 'native-base'

import styles from './styles'

class Login extends Component {
  handleLogin(e) {
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
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
            <Button iconLeft light onPress={() => this.handleLogin()} style={styles.buttonLogin}>
              <Icon name="sign-in" size={20} style={{ left: 10 }} />
              <Text>Login</Text>
            </Button>
          </Form>
        </View>
      </Container>
    )
  }
}

export default Login
