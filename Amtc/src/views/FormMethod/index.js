import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native'
import { Container, Content, Card, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

class FormMethod extends Component {
  handleManualInput() {
    Actions.checklist({ amt: null })
  }

  handleQRCodeInput() {
    Actions.push('scanner')
  }

  render() {
    return (
      <View style={styles.container}>
        <Container>
          <Content padder>
            <Card>
              <TouchableOpacity onPress={this.handleManualInput.bind(this)}>
                <View style={styles.list}>
                  <View style={styles.listLeft}>
                    <Text style={styles.listText}>Manual Input</Text>
                  </View>
                  <View style={styles.listRight}>
                    <Image
                      source={require('../../assets/img/icons/manual.png')}
                      style={styles.listRightImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.line} />
              <TouchableOpacity onPress={this.handleQRCodeInput.bind(this)}>
                <View style={styles.list}>
                  <View style={styles.listLeft}>
                    <Text style={styles.listText}>QRCode AMT</Text>
                  </View>
                  <View style={styles.listRight}>
                    <Image
                      source={require('../../assets/img/icons/qrcode.png')}
                      style={styles.listRightImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
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
    backgroundColor: 'transparent',
  },
  list: {
    padding: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  listText: {
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listSubText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: '#CBCBCB',
    fontSize: 12,
  },
  listRight: {
    alignItems: 'center',
  },
  listRightImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    height: 42,
    width: 42,
  },
  listRightButton: {
    borderRadius: 30,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 3,
    color: '#fff',
    backgroundColor: '#F06750',
  },
  listRightButtonText: {
    color: '#ffffff',
    alignSelf: 'center',
    borderRadius: 30,
  },
  line: {
    borderBottomColor: '#CBCBCB',
    borderBottomWidth: 0.7,
    marginTop: 10,
    marginBottom: 10,
  },
})

export default FormMethod
