import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { notification } from 'antd'

import { message } from '../../utils/message'
import UserList from '../../views/Users/UserList'
import UserForm from '../../views/Users/UserForm'

const queryUsers = gql`
  query users {
    users {
      _id
      username
      password
      NIP
      fullName
      email
      mobile
      roles
      status
      imgUrl
      createdAt
      createdBy {
        username
        roles
      }
    }
  }
`

const mutationCreateUser = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      _id
      username
      password
      NIP
      fullName
      email
      mobile
      roles
      status
      imgUrl
      createdAt
      createdBy {
        username
        roles
      }
    }
  }
`

const mutationUpdateUser = gql`
  mutation updateUser($id: ID!, $user: UserInput!) {
    updateUser(id: $id, user: $user) {
      _id
      username
      password
      NIP
      fullName
      email
      mobile
      roles
      status
      imgUrl
      createdAt
      createdBy {
        username
        roles
      }
    }
  }
`

const mutationDeleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`

class Users extends Component {
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
      this.props
        .onCreateItem(item)
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
    const { loading, error, refetch, users = [] } = this.props

    return !this.state.showForm ? (
      <UserList
        loading={loading}
        error={error}
        users={users}
        onRefresh={() => refetch()}
        onAddItem={this.handleAddItem}
        onEditItem={this.handleEditItem}
        onDeleteItem={this.handleDeleteItem}
      />
    ) : (
      <UserForm
        itemData={this.state.itemData}
        onBack={this.handleBack}
        onSubmitItem={itemData => this.handleSubmit(itemData)}
      />
    )
  }
}

export default compose(
  graphql(queryUsers, {
    options: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    props: ({ data }) => {
      const { loading, error, refetch, users } = data
      return loading || error
        ? {
            loading,
            error,
            refetch,
          }
        : {
            refetch,
            users,
          }
    },
  }),
  graphql(mutationCreateUser, {
    options: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    props: props => ({
      onCreateItem: user => {
        return props.mutate({
          variables: { user },
        })
      },
    }),
  }),
  graphql(mutationUpdateUser, {
    options: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    props: props => ({
      onUpdateItem: (id, user) => {
        return props.mutate({
          variables: { id, user },
        })
      },
    }),
  }),
  graphql(mutationDeleteUser, {
    options: {
      fetchPolicy: 'cache-and-network',
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
)(Users)
