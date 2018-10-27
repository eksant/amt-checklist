import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'

const Message = ({ info, success, warning, error, message }) => {
  return (
    <View
      style={[
        styles.messageContent,
        info
          ? styles.messageBgColorInfo
          : success
            ? styles.messageBgColorSuccess
            : warning
              ? styles.messageBgColorWarning
              : error
                ? styles.messageBgColorError
                : [],
      ]}
    >
      <View style={styles.messageIcon}>
        <FAIcon
          name={
            info
              ? 'info-circle'
              : success
                ? 'check-circle'
                : warning
                  ? 'warning'
                  : error
                    ? 'times-circle'
                    : ''
          }
          size={21}
          style={styles.colorWhite}
        />
      </View>
      <View style={styles.messageText}>
        <Text style={styles.colorWhite}>{message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContent: {
    borderRadius: 5,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    // borderWidth: 1,
  },
  messageIcon: {
    flexDirection: 'column',
    marginRight: 5,
  },
  messageText: {
    marginLeft: 5,
    flexDirection: 'column',
  },
  messageBgColorInfo: {
    backgroundColor: '#4553B4',
  },
  messageBgColorSuccess: {
    backgroundColor: '#38B44B',
  },
  messageBgColorWarning: {
    backgroundColor: '#C48E40',
  },
  messageBgColorError: {
    backgroundColor: '#C43435',
  },
  colorWhite: {
    color: '#ffffff',
  },
})

export default Message
