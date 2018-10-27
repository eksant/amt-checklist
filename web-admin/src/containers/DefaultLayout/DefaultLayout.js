import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react'
// sidebar nav config
import navigation from '../../_nav'
// routes config
import routes from '../../routes'
import DefaultAside from './DefaultAside'
import DefaultFooter from './DefaultFooter'
import DefaultHeader from './DefaultHeader'

class DefaultLayout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groupAccess: null,
      navGroup: {
        items: [],
      },
    }
  }

  componentDidMount() {
    const groupAccess = localStorage.getItem('group')

    if (groupAccess) {
      this.setState({ groupAccess })
      this.setState({
        navGroup: {
          items: navigation.items.filter(item => {
            if (item.groups && item.groups.length > 0) {
              var groupMenu = item.groups.filter(group => {
                return group === groupAccess
              })

              if (groupMenu && groupMenu.length > 0) {
                return item
              }
            } else {
              return item
            }
          }),
        },
      })
    }
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <AppSidebarNav navConfig={this.state.navGroup} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => <route.component {...props} />}
                    />
                  ) : null
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    )
  }
}

export default DefaultLayout
