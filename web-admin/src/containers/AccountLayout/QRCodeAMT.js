import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import QRCodeAMTList from '../../views/QRCodeAMT/QRCodeAMTList'

const queryMobilTangkis = gql`
  query mobiltangkis {
    mobiltangkis {
      _id
      nopol
      KL
      year
      status
      createdAt
      createdBy {
        username
        roles
      }
    }
  }
`

class QRCodeAMT extends Component {
  render() {
    // console.log('users props: ', this.props)
    const { loading, error, refetch, mobiltangkis = [] } = this.props

    return (
      <QRCodeAMTList
        loading={loading}
        error={error}
        mobiltangkis={mobiltangkis}
        onRefresh={() => refetch()}
      />
    )
  }
}

export default compose(
  graphql(queryMobilTangkis, {
    options: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    props: ({ data }) => {
      const { loading, error, refetch, mobiltangkis } = data
      return loading || error
        ? {
            loading,
            error,
            refetch,
          }
        : {
            refetch,
            mobiltangkis,
          }
    },
  })
)(QRCodeAMT)
