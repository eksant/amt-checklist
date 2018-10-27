import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Dimensions, ScrollView, View, Image, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import FAIcon from 'react-native-vector-icons/FontAwesome'

import { delAsyncToken } from '../../utils'

const window = Dimensions.get('window')
const { width, height } = window

export default function Menu({ onItemSelected }) {
  const handleLogout = async () => {
    const token = await delAsyncToken()
    // console.log('TOKEN', token)
    if (!token || token === undefined) {
      Actions.replace('auth')
    }
  }

  return (
    <ScrollView scrollsToTop={false} style={styles.sidebarMenu}>
      <View style={styles.sidebarAvatarContainer}>
        <Image
          style={styles.sidebarAvatar}
          source={require('../../assets/img/avatars/user-default.png')}
        />
        <Text style={styles.sidebarProfile}>Your name</Text>
        <Text style={styles.sidebarEditProfile} onPress={() => Actions.replace('profile')}>
          Edit Profile
        </Text>
      </View>

      <View style={styles.sidebarItemContainer}>
        <FAIcon name="home" size={22} style={styles.sidebarIcon} />
        <Text onPress={() => Actions.replace('dashboard')} style={styles.sidebarItem}>
          Home
        </Text>
      </View>

      <View style={styles.sidebarItemContainer}>
        <FAIcon name="calendar-check-o" size={22} style={styles.sidebarIcon} />
        <Text onPress={() => Actions.replace('checklist')} style={styles.sidebarItem}>
          Checklist Form
        </Text>
      </View>

      <View style={styles.sidebarItemContainer}>
        <FAIcon name="wpforms" size={22} style={styles.sidebarIcon} />
        <Text onPress={() => Actions.replace('histories')} style={styles.sidebarItem}>
          History Daily
        </Text>
      </View>

      <View style={styles.sidebarItemSeparator} />

      <View style={styles.sidebarItemContainer}>
        <FAIcon name="power-off" size={22} style={styles.sidebarIcon} />
        <Text onPress={() => handleLogout()} style={styles.sidebarItem}>
          Logout
        </Text>
      </View>
    </ScrollView>
  )
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  sidebarMenu: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#3D4550',
  },
  sidebarAvatarContainer: {
    width: width * (2 / 3),
    marginTop: 50,
    marginBottom: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarAvatar: {
    width: 64,
    height: 64,
    borderRadius: 48,
    marginBottom: 10,
  },
  sidebarProfile: {
    fontSize: 14,
    fontWeight: '300',
    color: '#ffffff',
    marginBottom: 8,
  },
  sidebarEditProfile: {
    fontSize: 10,
    fontWeight: '300',
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
  sidebarItemContainer: {
    paddingLeft: 65,
    marginBottom: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sidebarIcon: {
    color: '#ffffff',
  },
  sidebarItem: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '300',
    color: '#ffffff',
  },
  sidebarItemSeparator: {
    borderBottomWidth: 0.7,
    borderBottomColor: '#fff',
    marginLeft: 40,
    marginRight: 185,
    marginTop: 10,
    marginBottom: 30,
  },
})
