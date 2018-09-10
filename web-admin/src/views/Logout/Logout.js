import React from 'react'
import { ApolloConsumer } from 'react-apollo'

import * as routes from '../../routes'
import history from '../../history'

const SignOutButton = () => (
  <ApolloConsumer>
    {client => (
      <button type="button" onClick={() => logout(client)}>
        Sign Out
      </button>
    )}
  </ApolloConsumer>
)

const logout = client => {
  localStorage.setItem('token', '')
  client.resetStore()
  // history.push(routes.SIGN_IN)
}

export { logout }

export default SignOutButton
