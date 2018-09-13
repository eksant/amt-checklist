const React = require('react-native')
const { Dimensions, Platform } = React
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default {
  container: {
    flex: 1,
    backgroundColor: '#635DB7',
    width: null,
    height: null,
  },
  form: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    paddingRight: 30,
    width: deviceWidth - 50,
    marginTop: deviceHeight / 4,
    left: Platform.OS === 'android' ? 25 : 25,
    backgroundColor: 'rgba(247, 247, 247, 0.2)',
  },
  title: {
    alignSelf: 'center',
    color: '#FFF',
  },
  textWhite: {
    color: '#FFF',
  },
  textGrey: {
    color: '#454545',
  },
  button: {
    marginTop: 30,
    alignSelf: 'center',
  },
}
