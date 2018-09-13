const React = require('react-native')
const { Dimensions } = React
const deviceHeight = Dimensions.get('window').height

export default {
  container: {
    flex: 1,
    backgroundColor: '#635DB7',
    width: null,
    height: null,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    width: 250,
    height: null,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: deviceHeight / 5,
  },
  title: {
    flex: 1,
    color: '#D8D8D8',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
}
