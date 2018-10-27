import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Container, Content, Card, CardItem, Text } from 'native-base'

import Loading from '../../components/Loading'
import Message from '../../components/Message'
import HistoryList from './HistoryList'
import ConnectAlert from '../../components/ConnectAlert'
import { getChecklist } from '../../store/checklist/checklist.actions'

const window = Dimensions.get('window')
const { height } = window

class Histories extends Component {
  async componentDidMount() {
    const resp = await this.props.getChecklist()
    // console.log('RESP HISTORY DID MOUNT', resp)
    if (resp.error && resp.error.name === 'JsonWebTokenError') {
      this.props.alertWithType('error', 'Error', resp.message)
      Actions.replace('auth')
    }
  }

  render() {
    // console.log('PROPS HISTORIES', this.props.checklist)
    const { loading, error, message, checklist } = this.props.checklist

    return (
      <View style={styles.container}>
        <Container>
          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text>History Checklist ({checklist.length > 0 ? checklist.length : 0})</Text>
              </CardItem>
              <CardItem>
                <Content style={styles.content}>
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message error message={message} />
                  ) : (
                    <HistoryList items={checklist} />
                  )}
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
  },
  content: {
    height: height / 1.4,
    marginBottom: 5,
  },
})

const mapStateToProps = state => {
  return {
    checklist: state.checklist,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getChecklist,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectAlert(Histories))
