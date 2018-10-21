import React, { Component } from 'react'
import { Container, Content, Card, CardItem, Text, Body } from 'native-base'

export default class CheckMenggunakan extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem bordered>
              <Body>
                <Text>
                  NativeBase is a free and open source framework that enable developers to build
                  high-quality mobile apps using React Native iOS and Android apps with a fusion of
                  ES6.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
