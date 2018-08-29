import React, { Component } from 'react'
import { notification } from 'antd'

import UserList from '../../views/Users/UserList'
import UserForm from '../../views/Users/UserForm'

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
    notification['success']({
      message: 'Success Message',
      description: 'Success to submit record!',
      style: { top: '35px' },
    })
  }

  handleDeleteItem(id) {
    notification['success']({
      message: 'Success Message',
      description: 'Success to submit record!',
      style: { top: '35px' },
    })
  }

  render() {
    // console.log('users props: ', this.props)
    return !this.state.showForm ? (
      <UserList
        onRefresh={this.handleAddItem}
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

export default Users
