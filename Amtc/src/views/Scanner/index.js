import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
// import Icon from 'react-native-vector-icons/FontAwesome'
// import { Button } from 'native-base'
import QRCodeScanner from '../../components/QRCodeScanner'

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
    )
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
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
