import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Card, CardItem, Button, Text, Left, Right } from 'native-base'
import FAIcon from 'react-native-vector-icons/FontAwesome'

import Loading from '../../components/Loading'
import Message from '../../components/Message'
import ConnectAlert from '../../components/ConnectAlert'
import HistoryList from '../Histories/HistoryList'
import { getChecklist } from '../../store/checklist/checklist.actions'

const window = Dimensions.get('window')
const { height } = window

class Dashboard extends Component {
  componentDidMount() {
    this.handleRefresh()
  }

  async handleRefresh() {
    const resp = await this.props.getChecklist()
    // console.log('RESP HISTORY DID MOUNT', resp)
    if (resp.error && resp.error.name === 'JsonWebTokenError') {
      this.props.alertWithType('error', 'Error', resp.message)
      Actions.replace('login')
    }
  }

  render() {
    // console.log('PROPS DASHBOARD', this.props.checklist)
    const { loading, error, message, checklist } = this.props.checklist
    const topFiveChecklist = checklist.length > 0 ? checklist.slice(0, 5) : []

    return (
      <View style={styles.container}>
        <Container>
          <Content padder>
            <Card transparent>
              <CardItem>
                <Left style={{ flex: 1 }}>
                  <Button
                    iconLeft
                    success
                    onPress={() => Actions.push('formchecklist')}
                    disabled={error}
                  >
                    <FAIcon
                      name="calendar-check-o"
                      style={{ fontSize: 20, left: 10, color: '#FFF' }}
                    />
                    <Text>Form Checklist</Text>
                  </Button>
                </Left>
                <Right style={{ flex: 0 }}>
                  <Button iconLeft info onPress={() => Actions.push('histories')} disabled={error}>
                    <FAIcon name="wpforms" style={{ fontSize: 20, left: 10, color: '#FFF' }} />
                    <Text>History</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
            <Card>
              <CardItem header bordered>
                <Text>Checklist Previous</Text>
                <Button iconLeft transparent primary onPress={() => this.handleRefresh()}>
                  <FAIcon name="refresh" style={{ fontSize: 20, left: 10, color: 'green' }} />
                </Button>
              </CardItem>
              <CardItem>
                <Content style={styles.content}>
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message error message={message} />
                  ) : (
                    <HistoryList items={topFiveChecklist} />
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
    height: height / 1.9,
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
)(ConnectAlert(Dashboard))
