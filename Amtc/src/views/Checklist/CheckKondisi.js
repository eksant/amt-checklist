import React, { Component } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Text, List, ListItem, Textarea, CheckBox, Body, Form } from 'native-base'

const ShowReason = props => {
  const { status, reason, index, isLast, onChangeReason } = props

  return status === 0 ? (
    <Form>
      <Textarea
        bordered
        rowSpan={2}
        style={[isLast ? { marginBottom: 30 } : null, styles.formReason]}
        placeholder="input your reason here..."
        value={reason}
        onChangeText={reason => onChangeReason(index, reason)}
      />
    </Form>
  ) : null
}

const StatusCheckBox = props => {
  const { status, index, onChangeStatus } = props
  const value = status === 1 ? true : false
  return <CheckBox checked={value} style={styles.label} onPress={() => onChangeStatus(index)} />
}

export default class CheckKondisi extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data, onChangeStatus, onChangeReason } = this.props

    return (
      // <Container>
      <View style={{ flex: 1, height: 500, borderWidth: 1 }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <List
              dataArray={data}
              // onEndReachedThreshold={200}
              renderRow={(rowData, sectionID, rowID, highlightRow) => {
                // console.log(rowID + ' == ' + data.length)
                return (
                  <ListItem style={{ alignItems: 'flex-start' }}>
                    <StatusCheckBox
                      index={rowID}
                      status={rowData.status}
                      onChangeStatus={onChangeStatus}
                    />
                    <Body style={{ marginLeft: 5 }}>
                      <Text style={styles.label}>{rowData.name}</Text>

                      <ShowReason
                        index={rowID}
                        status={rowData.status}
                        reason={rowData.reason}
                        isLast={rowID === data.length - 1}
                        onChangeReason={onChangeReason}
                      />
                    </Body>
                  </ListItem>
                )
              }}
            />
          </View>
        </ScrollView>
      </View>
      // </Container>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
  },
  formReason: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
})
