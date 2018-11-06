import React, { Component } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Container, Content, Card, CardItem, Text } from 'native-base'
import QRCodeScanner from '../../components/QRCodeScanner'

const window = Dimensions.get('window')
const { height } = window

class Scanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nopol: null,
    }
  }

  async onSuccess(e) {
    await this.setState({ nopol: e.data })
    setTimeout(() => {
      this.props.navigation.navigate('Checklist')
    }, 1000)
    // Linking.openURL(e.data).catch(err => console.error('An error occured', err))
  }

  render() {
    const { nopol } = this.state

    return (
      <View style={styles.container}>
        <Container>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>QR Code No. Pol : {nopol}</Text>
              </CardItem>
              <CardItem>
                <Content style={styles.content}>
                  <QRCodeScanner
                    showMarker={true}
                    onRead={this.onSuccess.bind(this)}
                    topContent={<Text style={styles.centerText}>No.Pol: {nopol}</Text>}
                    // bottomContent={
                    //   <Button iconRight success onPress={() => this.props.navigation.navigate('Scanner')} style={styles.buttonTouchable}>
                    //     <Icon name="file" style={{ fontSize: 20, left: 10, color: '#FFF' }} />
                    //     <Text>Next</Text>
                    //   </Button>
                    // }
                  />
                </Content>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  content: {
    height: height / 1.4,
    marginBottom: 5,
  },
  centerText: {
    flex: 2,
    fontSize: 16,
    padding: 36,
    color: '#000',
    fontWeight: '500',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
})

export default Scanner
