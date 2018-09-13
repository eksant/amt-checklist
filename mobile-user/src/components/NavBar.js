import React, { Component } from 'react'
import { Container, Header, Left, Body, Title, Right, Button, Icon, Text } from 'native-base'

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
