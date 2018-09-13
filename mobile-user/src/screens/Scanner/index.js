import React, { Component } from 'react'
import { BarCodeScanner, Permissions } from 'expo'
import { Dimensions, LayoutAnimation } from 'react-native'
import { Container, Content, Card, CardItem, Text } from 'native-base'

// import styles from './styles'

class Scanner extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedUrl: null,
  }

  componentDidMount() {
    this.handleCameraPermission()
  }

  handleCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status === 'granted',
    })
  }

  handleBarCodeRead = result => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring()
      this.setState({ lastScannedUrl: result.data })
    }
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              {this.state.hasCameraPermission === null ? (
                <Text>Requesting for camera permission</Text>
              ) : this.state.hasCameraPermission === false ? (
                <Text style={{ color: '#fff' }}>Camera permission is not granted</Text>
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
              <Text note>No.Pol: {this.state.lastScannedUrl}</Text>
              {this.state.lastScannedUrl &&
                setTimeout(() => {
                  this.setState({ lastScannedUrl: null })
                  this.props.navigation.navigate('Checklist')
                }, 2000)}
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default Scanner
