import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { notification } from 'antd'

import { message } from '../../utils/message'
import MobilTangkiList from '../../views/MobilTangkis/MobilTangkiList'
import MobilTangkiForm from '../../views/MobilTangkis/MobilTangkiForm'

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

const mutationCreateMobilTangki = gql`
  mutation createMobilTangki($mobiltangki: MobilTangkiInput!) {
    createMobilTangki(mobiltangki: $mobiltangki) {
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

const mutationUpdateMobilTangki = gql`
  mutation updateMobilTangki($id: ID!, $mobiltangki: MobilTangkiInput!) {
    updateMobilTangki(id: $id, mobiltangki: $mobiltangki) {
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

const mutationDeleteMobilTangki = gql`
  mutation deleteMobilTangki($id: ID!) {
    deleteMobilTangki(id: $id)
  }
`

class MobilTangkis extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showForm: false,
      itemData: null,
    }

    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleEditItem = this.handleEditItem.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }

  handleAddItem() {
    this.setState({
      showForm: true,
      itemData: null,
    })
  }

  handleEditItem(itemData) {
    this.setState({
      showForm: true,
      itemData,
    })
  }

  handleBack() {
    this.setState({
      showForm: false,
      itemData: null,
    })
  }

  handleSubmit(item) {
    if (!this.state.itemData) {
      const newItem = {
        ...item,
        year: Number(item.year),
      }

      this.props
        .onCreateItem(newItem)
        .then(() => {
          notification['success']({
            message: 'Success Message',
            description: 'Success to create record!',
            style: { top: '35px' },
          })
          this.props.refetch()
          this.handleBack()
        })
        .catch(res => {
          notification['warning']({
            message: 'Validation Message',
            description: message(res.message), //res.message.replace('GraphQL error: ValidationError: ', ''),
            style: { top: '35px' },
          })
        })
    } else {
      this.props
        .onUpdateItem(this.state.itemData._id, item)
        .then(() => {
          notification['success']({
            message: 'Success Message',
            description: 'Success to update record!',
            style: { top: '35px' },
          })
          this.props.refetch()
          this.handleBack()
        })
        .catch(res => {
          notification['warning']({
            message: 'Validation Message',
            description: message(res.message), //res.message.replace('GraphQL error: ValidationError: ', ''),
            style: { top: '35px' },
          })
        })
    }
  }

  handleDeleteItem(id) {
    this.props
      .onDeleteItem(id)
      .then(() => {
        notification['success']({
          message: 'Success Message',
          description: 'Success to delete record!',
          style: { top: '35px' },
        })
        this.props.refetch()
        this.handleBack()
      })
      .catch(res => {
        notification['warning']({
          message: 'Validation Message',
          description: message(res.message), //res.message.replace('GraphQL error: ValidationError: ', ''),
          style: { top: '35px' },
        })
      })
  }

  render() {
    // console.log('users props: ', this.props)
    const { loading, error, refetch, mobiltangkis = [] } = this.props

    return !this.state.showForm ? (
      <MobilTangkiList
        loading={loading}
        error={error}
        mobiltangkis={mobiltangkis}
        onRefresh={() => refetch()}
        onAddItem={this.handleAddItem}
        onEditItem={this.handleEditItem}
        onDeleteItem={this.handleDeleteItem}
      />
    ) : (
      <MobilTangkiForm
        itemData={this.state.itemData}
        onBack={this.handleBack}
        onSubmitItem={itemData => this.handleSubmit(itemData)}
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
      return loading
        ? { loading, refetch }
        : error
        ? typeof error === 'object'
          ? {
              error: {
                message:
                  'Your session expired. Sign in again!\nPlease wait until redirect to login page.',
              },
            }
          : { error, refetch }
        : { refetch, mobiltangkis }
    },
  }),
  graphql(mutationCreateMobilTangki, {
    options: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    props: props => ({
      onCreateItem: mobiltangki => {
        return props.mutate({
          variables: { mobiltangki },
        })
      },
    }),
  }),
  graphql(mutationUpdateMobilTangki, {
    options: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    props: props => ({
      onUpdateItem: (id, mobiltangki) => {
        return props.mutate({
          variables: { id, mobiltangki },
        })
      },
    }),
  }),
  graphql(mutationDeleteMobilTangki, {
    options: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    props: props => ({
      onDeleteItem: id => {
        return props.mutate({
          variables: { id },
        })
      },
    }),
  })
)(MobilTangkis)
