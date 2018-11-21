import React, { Component } from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Text, List, ListItem, Textarea, CheckBox, Body, Form } from 'native-base'

const ShowReason = props => {
  const { status, reason, index, onChangeReason } = props

  return status === 0 ? (
    <Form>
      <Textarea
        bordered
        rowSpan={2}
        style={styles.formReason}
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
      <ScrollView>
        <View>
          <List
            dataArray={data}
            // onEndReachedThreshold={200}
            renderRow={(rowData, sectionID, rowID, highlightRow) => {
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
                      onChangeReason={onChangeReason}
                    />
                  </Body>
                </ListItem>
              )
            }}
          />
        </View>
      </ScrollView>
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
