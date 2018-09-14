import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Root } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  DrawerItems,
} from 'react-navigation'

import Splash from './src/screens/Splash'
import Login from './src/screens/Login'
import Logout from './src/screens/Logout'
import Dashboard from './src/screens/Dashboard'
import Profile from './src/screens/Profile'
import Scanner from './src/screens/Scanner'
import Checklist from './src/screens/Checklist'
import Histories from './src/screens/Histories'

import store from './src/store/index'

const CustomDrawerContentComponent = prop => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 25,
          borderBottomColor: 'rgba(255, 255, 255, 0.4)',
          borderBottomWidth: 1,
          alignItems: 'center',
        }}>
        <Image
          style={{ height: 150, width: 150 }}
          source={require('./src/assets/img/brand/header-sidebar.jpeg')}
        />
        <Text style={{ fontSize: 24, marginTop: 12, color: '#fff' }}>Seorang Eksa</Text>
      </View>
      <DrawerItems
        {...prop}
        activeTintColor="#2196f3"
        activeBackgroundColor="rgba(0, 0, 0, .1)"
        inactiveTintColor="rgba(0, 0, 0, .87)"
        inactiveBackgroundColor="transparent"
        style={{ backgroundColor: '#000000' }}
        labelStyle={{ color: '#ffffff', fontSize: 16, fontWeight: '200' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    borderBottomWidth: 1,
    backgroundColor: '#FFF',
  },
})

const LoginScreen = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
})

const DashboardScreen = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: ({ navigation }) => ({
        headerStyle: styles.header,
        headerTitle: 'Daily AMT Checklist',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Icon name="home" size={20} style={{ paddingLeft: 10 }} />
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="user-circle-o" size={20} style={{ paddingRight: 10 }} />
          </TouchableOpacity>
        ),
      }),
    },
    Scanner: {
      screen: Scanner,
      navigationOptions: ({ navigation }) => ({
        headerStyle: styles.header,
        headerTitle: 'Form Scanner',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Icon name="home" size={20} style={{ paddingLeft: 10 }} />
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="user-circle-o" size={20} style={{ paddingRight: 10 }} />
          </TouchableOpacity>
        ),
      }),
    },
    Checklist: {
      screen: Checklist,
      navigationOptions: ({ navigation }) => ({
        headerStyle: styles.header,
        headerTitle: 'Form Checklist',
        headerRight: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="user-circle-o" size={20} style={{ paddingRight: 10 }} />
          </TouchableOpacity>
        ),
      }),
    },
    Histories: {
      screen: Histories,
      navigationOptions: ({ navigation }) => ({
        headerStyle: styles.header,
        headerTitle: 'History',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Icon name="home" size={20} style={{ paddingLeft: 10 }} />
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="user-circle-o" size={20} style={{ paddingRight: 10 }} />
          </TouchableOpacity>
        ),
      }),
    },
  },
  {
    initialRouteName: 'Dashboard',
    // headerMode: 'none',
  }
)

const HomeScreen = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerStyle: styles.header,
        headerTitle: 'Profile',
        headerTintColor: '#FFF',
      },
    },
    Logout: {
      screen: Logout,
    },
  },
  {
    headerMode: 'float',
    drawerPosition: 'left',
    initialRouteName: 'Dashboard',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: 'rgba(0, 0, 0, .5)',
    contentComponent: CustomDrawerContentComponent,
  }
)

const RootStack = createSwitchNavigator(
  {
    Splash: { screen: Splash },
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen },
  },
  {
    initialRouteName: 'Splash',
  }
)

export default class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <RootStack />
        </Provider>
      </Root>
    )
  }
}
