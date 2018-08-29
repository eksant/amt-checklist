import React, { Component } from 'react'
import { notification } from 'antd'

import MobilTangkiList from '../../views/MobilTangki/MobilTangkiList'
import MobilTangkiForm from '../../views/MobilTangki/MobilTangkiForm'

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
    // console.log('mobil tangkis props: ', this.props)
    return !this.state.showForm ? (
      <MobilTangkiList
        onRefresh={this.handleAddItem}
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

export default MobilTangkis
