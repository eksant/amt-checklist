import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Button, H3, Form, Item, Input, Label, Icon, Text } from 'native-base'

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
            <Button
              iconLeft
              light
              onPress={() => this.handleLogin()}
              style={styles.button}>
              <Icon type="FontAwesome" name="sign-in" style={styles.textGrey} />
              <Text style={styles.textGrey}>Login</Text>
            </Button>
          </Form>
        </View>
      </Container>
    )
  }
}

export default Login
