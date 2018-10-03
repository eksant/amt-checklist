import React, { Component } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
// import { BarCodeScanner, Permissions } from 'expo'
import { Container, Content, Card, CardItem, Text } from 'native-base'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

class Scanner extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedResult: null,
    nopol: null,
  }

  // componentDidMount() {
  //   this.handleCameraPermission()
  // }

  // componentWillUnmount() {
  //   this.setState({ lastScannedResult: null })
  // }

  // handleCameraPermission = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA)
  //   this.setState({
  //     hasCameraPermission: status === 'granted',
  //   })
  // }

  // handleBarCodeRead = result => {
  //   if (result.data !== this.state.lastScannedResult) {
  //     LayoutAnimation.spring()
  //     this.setState({ lastScannedResult: result.data })
  //   }
  // }

  handleQRCodeScanner(e) {
    if (e.data) {
      this.setState({ nopol: e.data })
    }
  }

  render() {
    const { nopol } = this.state

    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <QRCodeScanner
                onRead={this.handleQRCodeScanner.bind(this)}
                topContent={<Text style={styles.centerText}>{nopol}</Text>}
                style={styles.centerScanner}
              />
            </CardItem>
          </Card>

          {/* <Card>
            <CardItem>
              {this.state.hasCameraPermission === null ? (
                <Text note>Requesting for camera permission</Text>
              ) : this.state.hasCameraPermission === false ? (
                <Text note style={{ color: 'red' }}>
                  Camera permission is not granted
                </Text>
              ) : (
                <BarCodeScanner
                  onBarCodeRead={this.handleBarCodeRead.bind(this)}
                  style={{
                    alignSelf: 'center',
                    height: Dimensions.get('window').height / 2,
                    width: Dimensions.get('window').width / 1.17,
                  }}
                />
              )}
            </CardItem>
            <CardItem footer bordered>
              <Text note>No.Pol: {this.state.lastScannedResult}</Text>
              {this.state.lastScannedResult &&
                setTimeout(() => {
                  this.setState({ lastScannedResult: null })
                  this.props.navigation.navigate('Checklist')
                }, 2000)}
            </CardItem>
          </Card> */}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 14,
    padding: 32,
    color: '#777',
  },
  centerScanner: {
    alignSelf: 'center',
    height: 200, // deviceHeight / 100,
    // width: deviceWidth / 1.17,
  },
})

export default Scanner
