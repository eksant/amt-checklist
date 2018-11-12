import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { notification } from 'antd'

import { message } from '../../utils/message'
import ChecklistRequest from '../../views/Checklist/ChecklistRequest'
import ChecklistApproval from '../../views/Checklist/ChecklistApproval'

const queryChecklists = gql`
  query checklists {
    checklists {
      _id
      createdAt
      createdBy {
        _id
        username
        roles
      }
      mobiltangki {
        _id
        nopol
      }
      status
      rejectedReason
      approvedBy {
        username
        roles
      }
      ritase
      odoKM
      HSSE
      PWSAMT
      TBBM
      remarks
      imgUrl
      kondisiRem
      kondisiRemReason
      kondisiBan
      kondisiBanReason
      kondisiWiper
      kondisiWiperReason
      kondisiLampu
      kondisiLampuReason
      kondisiKompartemen
      kondisiKompartemenReason
      kondisiApar
      kondisiAparReason
      kondisiOliMesin
      kondisiOliMesinReason
      kondisiAirRadiator
      kondisiAirRadiatorReason
      keberadaanSTNK
      keberadaanSTNKReason
      keberadaanSuratKeur
      keberadaanSuratKeurReason
      keberadaanSuratTera
      keberadaanSuratTeraReason
      keberadaanP3K
      keberadaanP3KReason
      keberadaanFlameTrap
      keberadaanFlameTrapReason
      keberadaanBanSerep
      keberadaanBanSerepReason
      keberadaanToolkit
      keberadaanToolKitReason
      keberadaanGroundingCable
      keberadaanGroundingCableReason
      keberadaanSelangBongkar
      keberadaanSelangBongkarReason
      keberadaanSpillKit
      keberadaanSpillKitReason
      membawaSIM
      membawaSIMReason
      membawaSuratIjinArea
      membawaSuratIjinAreaReason
      membawaBukuSaku
      membawaBukuSakuReason
      membawaCatatanPerjalanan
      membawaCatatanPerjalananReason
      menggunakanSeragam
      menggunakanSeragamReason
      menggunakanSafetyShoes
      menggunakanSafetyShoesReason
      menggunakanSafetyHelm
      menggunakanSafetyHelmReason
      menggunakanIDCard
      menggunakanIDCardReason
      menggunakanSarungTangan
      menggunakanSarungTanganReason
      menggunakanJasHujan
      menggunakanJamHujanReason
    }
  }
`

const mutationApprovalCheckList = gql`
  mutation approvalCheckList($id: ID!, $approval: ApprovalChecklistInput!) {
    approvalCheckList(id: $id, approval: $approval) {
      _id
      createdBy {
        username
        roles
      }
      mobiltangki {
        nopol
      }
      status
      approvedBy {
        username
        roles
      }
      rejectedReason
      ritase
      odoKM
      HSSE
      PWSAMT
      TBBM
      kondisiRem
      kondisiRemReason
      kondisiBan
      kondisiBanReason
    }
  }
`

class Checklist extends Component {
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
    // console.log('checklist props: ', this.props)
    const { loading, error, refetch, checklists = [] } = this.props

    return !this.state.showForm ? (
      <ChecklistRequest
        loading={loading}
        error={error}
        checklists={checklists}
        onRefresh={() => refetch()}
        onAddItem={this.handleAddItem}
        onEditItem={this.handleEditItem}
        onDeleteItem={this.handleDeleteItem}
      />
    ) : (
      <ChecklistApproval
        itemData={this.state.itemData}
        onBack={this.handleBack}
        onSubmitItem={itemData => this.handleSubmit(itemData)}
      />
    )
  }
}

export default compose(
  graphql(queryChecklists, {
    options: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    props: ({ data }) => {
      const { loading, error, refetch, checklists } = data
      return loading || error
        ? {
            loading,
            error,
            refetch,
          }
        : {
            refetch,
            checklists,
          }
    },
  }),
  graphql(mutationApprovalCheckList, {
    options: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    props: props => ({
      onCreateItem: (id, approval) => {
        return props.mutate({
          variables: { id, approval },
        })
      },
    }),
  })
)(Checklist)
