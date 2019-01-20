import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { notification } from 'antd'

import { message } from '../../utils/message'
import AdminList from '../../views/Admins/AdminList'
import AdminForm from '../../views/Admins/AdminForm'

const queryAdmins = gql`
  query admins {
    admins {
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

const mutationCreateAdmin = gql`
  mutation createAdmin($admin: AdminInput!) {
    createAdmin(admin: $admin) {
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

const mutationUpdateAdmin = gql`
  mutation updateAdmin($id: ID!, $admin: AdminInput!) {
    updateAdmin(id: $id, admin: $admin) {
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

const mutationDeleteAdmin = gql`
  mutation deleteAdmin($id: ID!) {
    deleteAdmin(id: $id)
  }
`

class Admins extends Component {
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
    // console.log('admins props: ', this.props)
    const { loading, error, refetch, admins = [] } = this.props

    return !this.state.showForm ? (
      <AdminList
        loading={loading}
        error={error}
        admins={admins}
        onRefresh={() => refetch()}
        onAddItem={this.handleAddItem}
        onEditItem={this.handleEditItem}
        onDeleteItem={this.handleDeleteItem}
      />
    ) : (
      <AdminForm
        itemData={this.state.itemData}
        onBack={this.handleBack}
        onSubmitItem={itemData => this.handleSubmit(itemData)}
      />
    )
  }
}

export default compose(
  graphql(queryAdmins, {
    options: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    props: ({ data }) => {
      const { loading, error, refetch, admins } = data
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
        : { refetch, admins }
    },
  }),
  graphql(mutationCreateAdmin, {
    options: {
      fetchPolicy: 'no-caches',
      errorPolicy: 'all',
    },
    props: props => ({
      onCreateItem: admin => {
        return props.mutate({
          variables: { admin },
        })
      },
    }),
  }),
  graphql(mutationUpdateAdmin, {
    options: {
      fetchPolicy: 'no-caches',
      errorPolicy: 'all',
    },
    props: props => ({
      onUpdateItem: (id, admin) => {
        return props.mutate({
          variables: { id, admin },
        })
      },
    }),
  }),
  graphql(mutationDeleteAdmin, {
    options: {
      fetchPolicy: 'no-caches',
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
)(Admins)
