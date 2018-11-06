import React, { Component } from 'react'
import { Router, Scene, Lightbox, Reducer } from 'react-native-router-flux'
import SideMenu from 'react-native-side-menu'
import { Header, Left, Right, Button, Text } from 'native-base'
import { StyleSheet, View, ScrollView } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import AlertProvider from './src/components/AlertProvider'

import Splash from './src/views/Splash'
import Login from './src/views/Login'
import Dashboard from './src/views/Dashboard'
import Sidebar from './src/views/Sidebar'
import Profile from './src/views/Profile'
import Scanner from './src/views/Scanner'
import Checklist from './src/views/Checklist'
import Histories from './src/views/Histories'

/* create reducer for router */
const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    // console.log('ACTION:', action)
    return defaultReducer(state, action)
  }
}

/* wrap component sidebar and content */
const WrapperComponent = ComposedComponent =>
  class extends Component {
    constructor(props) {
      super(props)

      this.toggle = this.toggle.bind(this)

      this.state = {
        isOpen: false,
      }
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen,
      })
    }

    updateMenuState(isOpen) {
      this.setState({ isOpen })
    }

    onMenuItemSelected = item =>
      this.setState({
        isOpen: false,
      })

    render() {
      const menu = <Sidebar onItemSelected={this.onMenuItemSelected} />

      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
          <View>
            <Header style={styles.header}>
              <Left style={styles.headerLeftButton}>
                <Button transparent onPress={this.toggle}>
                  <FAIcon name="navicon" size={22} style={styles.headerIcon} />
                </Button>
              </Left>
              <View style={styles.headerTitleContent}>
                <Text style={styles.headerTitle}>AMT Daily Checklist</Text>
              </View>
              <Right style={styles.headerRightButton}>
                <Button transparent>
                  <FAIcon name="bell" size={22} style={styles.headerIcon} />
                </Button>
              </Right>
            </Header>
            <View style={styles.content}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <ComposedComponent {...this.props} />
              </ScrollView>
            </View>
          </View>
        </SideMenu>
      )
    }
  }

class App extends Component {
  render() {
    const getSceneStyle = (props, computedProps) => {
      const style = {
        backgroundColor: 'transparent',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
      }
      return style
    }

    return (
      <AlertProvider>
        <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
          <Lightbox>
            <Scene key="splash" component={Splash} hideNavBar initial />
            <Scene key="auth">
              <Scene key="login" component={Login} hideNavBar initial />
            </Scene>
            <Scene
              key="home"
              hideNavBar
              // title="AMT DAILY CHECKLIST"
              // navigationBarStyle={styles.header}
              // titleStyle={[styles.headerTitleContent, styles.headerTitle]}
              // onLeft={() => alert('hello')}
              // leftTitle={<FAIcon name="navicon" size={22} style={styles.headerIcon} />}
              // onRight={() => alert('hello')}
              // rightTitle={<FAIcon name="bell" size={22} style={styles.headerIcon} />}
            >
              <Scene key="dashboard" component={WrapperComponent(Dashboard)} initial />
              <Scene key="profile" component={WrapperComponent(Profile)} />
              <Scene key="histories" component={WrapperComponent(Histories)} />
              <Scene key="formchecklist" hideNavBar>
                <Scene key="qrcode" component={WrapperComponent(Scanner)} initial />
                <Scene key="checklist" component={WrapperComponent(Checklist)}  />
              </Scene>
            </Scene>

            {/* <Scene key="root" hideNavBar> */}
            {/* <Scene key="splash" component={Splash} hideNavBar initial /> */}
            {/* <Scene key="login" component={Login} hideNavBar /> */}
            {/* <Scene key="home" component={WrapperComponent(Dashboard)} /> */}
            {/* <Scene key="profile" component={WrapperComponent(Profile)} /> */}
            {/* <Scene key="histories" component={WrapperComponent(Histories)} /> */}
            {/* </Scene> */}
          </Lightbox>
        </Router>
      </AlertProvider>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 0,
  },
  header: {
    borderBottomWidth: 0.5,
    backgroundColor: '#4553B4',
    borderBottomColor: '#CBCBCB',
  },
  headerLeftButton: {
    flex: 1,
  },
  headerIcon: {
    color: '#fff',
  },
  headerTitleContent: {
    alignSelf: 'center',
  },
  headerTitle: {
    color: '#fff',
    alignItems: 'center',
  },
  headerRightButton: {
    flex: 1,
  },
})

export default App
