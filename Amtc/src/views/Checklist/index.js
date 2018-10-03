import React, { Component } from 'react'
import { Container, Content, Card, CardItem, Text } from 'native-base'

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
