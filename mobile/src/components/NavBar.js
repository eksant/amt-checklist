import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Container, Header, Left, Body, Title, Right, Button, Text } from 'native-base'

class NavBar extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Icon name="home" />
            </Button>
          </Left>
          <Body>
            {/* <Title>Daily Checklist</Title> */}
            <Text style={{ fontWeight: 'bold' }}>Daily Checklist</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="person" />
            </Button>
          </Right>
        </Header>
      </Container>
    )
  }
}

export default NavBar
