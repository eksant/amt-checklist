import React, { Component } from 'react'
import { Dimensions, LayoutAnimation } from 'react-native'
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  Icon,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body,
} from 'native-base'

// import styles from './styles'

class Checklist extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
            <Text note>No.Pol: </Text>
            </CardItem>
            <CardItem footer bordered>
              <Text note>No.Pol: </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default Checklist
