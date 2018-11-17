import React from 'react'
import { ScrollView } from 'react-native'
import { Text, List, ListItem, Left, Right, Body } from 'native-base'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'

const HistoryList = ({ items }) => {
  return (
    <List>
      <ScrollView>
        {items.map(item => {
          const colorStatus =
            item.status === 'Approved' ? 'green' : item.status === 'Waiting' ? 'blue' : 'red'
          const iconName =
            item.status === 'Approved' ? 'check' : item.status === 'Waiting' ? 'clock-o' : 'close'

          return (
            <ListItem avatar key={item._id}>
              <Left>
                <FAIcon name={iconName} style={{ fontSize: 20, color: colorStatus }} />
              </Left>
              <Body>
                <Text style={{ fontSize: 12 }}>
                  AMT {item.mobiltangki && item.mobiltangki.nopol}
                </Text>
                <Text style={{ fontSize: 10 }}>Status {item.status}</Text>
                <Text style={{ fontSize: 9 }} note>
                  {item.rejectedReason}
                </Text>
              </Body>
              <Right>
                <Text note>{moment(item.updatedAt).format('DD MMM YYYY hh:mm')}</Text>
              </Right>
            </ListItem>
          )
        })}
      </ScrollView>
    </List>
  )
}

export default HistoryList
