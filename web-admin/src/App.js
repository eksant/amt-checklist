import axios from 'axios'
import React, { Component } from 'react'
import { HashRouter, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
// import { ApolloClient } from 'apollo-client'
// import { getMainDefinition } from 'apollo-utilities'
// import { ApolloLink, split } from 'apollo-link'
// import { HttpLink } from 'apollo-link-http'
// import { WebSocketLink } from 'apollo-link-ws'
// import { onError } from 'apollo-link-error'
// import { InMemoryCache } from 'apollo-cache-inmemory'

import { notification } from 'antd'

import './App.css'
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css'
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css'
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css'
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css'
// Import Main styles for this application
import './scss/style.css'

import config from './config'

// Containers
import { DefaultLayout } from './containers'

// Views
import Login from './views/Login'

// const httpLink = new HttpLink({
//   uri: config.EndpointGraphql, // 'http://localhost:3030/graphql',
// })

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:3030/graphql`,
//   options: {
//     reconnect: true,
//   },
// })

// const terminatingLink = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     // console.log('operation', operation)
//     return kind === 'OperationDefinition' && operation === 'subscription'
//   },
//   // wsLink,
//   httpLink
// )

// const authLink = new ApolloLink((operation, forward) => {
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       'token': localStorage.getItem('token'),
//     },
//   }))

//   return forward(operation)
// })

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message, locations, path }) => {
//       console.log('GraphQL error', message)

//       if (message === 'NOT_AUTHENTICATED') {
//         localStorage.removeItem('token')
//         window.location.reload()
//       }
//     })
//   }

//   if (networkError) {
//     console.log('Network error', networkError)

//     if (networkError.statusCode === 401) {
//       localStorage.removeItem('token')
//       window.location.reload()
//     }
//   }
// })

// const link = ApolloLink.from([authLink, errorLink, httpLink])
// const cache = new InMemoryCache()
// const client = new ApolloClient({
//   link,
//   cache,
// })

const client = new ApolloClient({
  uri: config.EndpointGraphql,
  fetchOptions: {
    credentials: 'include',
  },
  request: async operation => {
    const token = await localStorage.getItem('token')
    operation.setContext({
      headers: {
        token: token,
      },
    })
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // console.log('GraphQL error', message)

        if (message === 'NOT_AUTHENTICATED') {
          localStorage.removeItem('token')
          window.location.reload()
        }
      })
    }

    if (networkError) {
      // console.log('Network error', networkError)
      if (networkError.statusCode === 401) {
        localStorage.removeItem('token')
        window.location.reload()
      }
    }
  },
  clientState: {
    defaults: {
      isConnected: true,
    },
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          cache.writeData({ data: { isConnected } })
          return null
        },
      },
    },
  },
})

class App extends Component {
  onSubmitLogin(username, password) {
    axios
      .post(`${config.EndpointRestAPI}/signin`, { username, password })
      .then(res => {
        // console.log(res.data)
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('group', res.data.user.roles)
          window.location.reload()
          // history.push('#/')
        } else {
          notification['error']({
            message: 'Login Message',
            description: res.data.error,
            style: { top: '35px' },
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <HashRouter>
        <ApolloProvider client={client}>
          {/* <Switch> */}
            {!localStorage.getItem('token') ? (
              <Login onSubmitLogin={this.onSubmitLogin} />
            ) : (
              <DefaultLayout />
            )}
          {/* </Switch> */}
        </ApolloProvider>
      </HashRouter>
    )
  }
}

export default App
