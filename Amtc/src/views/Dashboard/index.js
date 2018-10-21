import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body,
} from 'native-base'

class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Card transparent>
            <CardItem>
              <Left style={{ flex: 1 }}>
                <Button iconLeft success onPress={() => this.props.navigation.navigate('Checklist')}>
                  <Icon name="file" style={{ fontSize: 20, left: 10, color: '#FFF' }} />
                  <Text>Form Checklist</Text>
                </Button>
              </Left>
              <Right style={{ flex: 0 }}>
                <Button iconLeft info>
                  <Icon name="copy" style={{ fontSize: 20, left: 10, color: '#FFF' }} />
                  <Text>History</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Checklist Previous</Text>
            </CardItem>
            <CardItem>
              <Content>
                <List>
                  <ListItem avatar>
                    <Left>
                      <Icon name="check" style={{ fontSize: 20, color: 'green' }} />
                    </Left>
                    <Body>
                      <Text>Request Approved</Text>
                      <Text note>No Reason</Text>
                    </Body>
                    <Right>
                      <Text note>14/09/2018</Text>
                    </Right>
                  </ListItem>
                  <ListItem avatar>
                    <Left>
                      <Icon name="times" style={{ fontSize: 20, color: 'red' }} />
                    </Left>
                    <Body>
                      <Text>Request Rejected</Text>
                      <Text note>Reason: Sopir dan Kernet kurang ganteng..</Text>
                    </Body>
                    <Right>
                      <Text note>14/09/2018</Text>
                    </Right>
                  </ListItem>
                  <ListItem avatar>
                    <Left>
                      <Icon name="history" style={{ fontSize: 20, color: 'blue' }} />
                    </Left>
                    <Body>
                      <Text>Request Onprocess</Text>
                      <Text note>No Reason</Text>
                    </Body>
                    <Right>
                      <Text note>14/09/2018</Text>
                    </Right>
                  </ListItem>
                </List>
              </Content>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default Dashboard
