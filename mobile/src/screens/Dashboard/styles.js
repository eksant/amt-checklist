const React = require('react-native')
const { Dimensions } = React
const deviceHeight = Dimensions.get('window').height

export default {
  titleHeader: {
    alignSelf: 'center',
    fontSize: 8,
  },
  buttonLeft: {
    left: 0,
  },
  buttonRight: {
    alignSelf: 'right',
  },
}
