import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RNCamera } from 'react-native-camera'
import { Actions } from 'react-native-router-flux'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Container, Content, Card, CardItem, Text } from 'native-base'

import ConnectAlert from '../../components/ConnectAlert'
import { getMobilTangkiByNoPol } from '../../store/mobiltangkis/mobiltangki.actions'

const window = Dimensions.get('window')
const { height } = window

class Scanner extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nopol: null,
      onChecking: false,
    }
  }

  onBarCodeRead(result) {
    // console.log(result)
    if (!this.state.nopol && !this.state.onChecking) {
      const timeOut = 800
      this.setState({ onChecking: true })

      this.props
        .getMobilTangkiByNoPol(result.data)
        .then(resp => {
          // console.log(resp)
          if (resp.status === 200) {
            this.setState({
              nopol: resp.data.nopol,
              onChecking: false,
            })

            setTimeout(() => {
              Actions.checklist({ amt: resp.data })
            }, timeOut)
          } else {
            this.setState({
              nopol: resp.message,
              onChecking: false,
            })
            this.props.alertWithType('error', 'Error', resp.message)

            setTimeout(() => {
              this.setState({
                nopol: null,
                onChecking: false,
              })
            }, timeOut)
          }
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }

  render() {
    const { nopol } = this.state

    return (
      <View style={styles.container}>
        <Container>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>No. Pol : {nopol}</Text>
              </CardItem>
              <CardItem>
                <View style={styles.content}>
                  <RNCamera
                    style={styles.camera}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    // onBarCodeRead={this.onBarCodeRead.bind(this)}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                      // console.log(barcodes)
                      this.onBarCodeRead(barcodes[0])
                    }}
                  >
                    <View style={styles.rectangleContainer}>
                      <View style={styles.rectangle} />
                    </View>
                  </RNCamera>
                </View>
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
    flex: 1,
    // flex: 2,
    // flexDirection: 'row',
    // backgroundColor: '#fff',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    height: height / 1.5,
    marginBottom: 5,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  camera: {
    // flex: 1,
    height: height / 1.5,
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
  // list: {
  //   // flex: 2,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   padding: 8,
  //   backgroundColor: 'grey',
  // },
  // listLeft: {
  //   // flex: 2,
  //   alignItems: 'flex-start',
  //   justifyContent: 'center',
  //   backgroundColor: 'blue',
  // },
  // listText: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  // },
  // listRight: {
  //   alignItems: 'center',
  // },
  // listRightImage: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   alignSelf: 'flex-end',
  //   height: 64,
  //   width: 64,
  // },

  line: {
    borderBottomColor: '#CBCBCB',
    borderBottomWidth: 0.7,
    marginTop: 10,
    marginBottom: 10,
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMobilTangkiByNoPol,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(ConnectAlert(Scanner))
