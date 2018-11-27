import React, { Component } from 'react'
// import { compose, graphql } from 'react-apollo'
// import gql from 'graphql-tag'

import { notification } from 'antd'

import { message } from '../../utils/message'
import ChecklistRequest from '../../views/Checklist/ChecklistRequest'

const searchParams = params =>
  Object.keys(params)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    })
    .join('&')

// const queryChecklists = gql`
//   query checklists {
//     checklists {
//       _id
//       createdAt
//       createdBy {
//         _id
//         username
//         roles
//       }
//       mobiltangki {
//         _id
//         nopol
//       }
//       status
//       rejectedReason
//       approvedBy {
//         username
//         roles
//       }
//       ritase
//       odoKM
//       HSSE
//       PWSAMT
//       TBBM
//       remarks
//       imgUrl
//       kondisiRem
//       kondisiRemReason
//       kondisiBan
//       kondisiBanReason
//       kondisiWiper
//       kondisiWiperReason
//       kondisiLampu
//       kondisiLampuReason
//       kondisiKompartemen
//       kondisiKompartemenReason
//       kondisiApar
//       kondisiAparReason
//       kondisiOliMesin
//       kondisiOliMesinReason
//       kondisiAirRadiator
//       kondisiAirRadiatorReason
//       keberadaanSTNK
//       keberadaanSTNKReason
//       keberadaanSuratKeur
//       keberadaanSuratKeurReason
//       keberadaanSuratTera
//       keberadaanSuratTeraReason
//       keberadaanP3K
//       keberadaanP3KReason
//       keberadaanFlameTrap
//       keberadaanFlameTrapReason
//       keberadaanBanSerep
//       keberadaanBanSerepReason
//       keberadaanToolkit
//       keberadaanToolKitReason
//       keberadaanGroundingCable
//       keberadaanGroundingCableReason
//       keberadaanSelangBongkar
//       keberadaanSelangBongkarReason
//       keberadaanSpillKit
//       keberadaanSpillKitReason
//       membawaSIM
//       membawaSIMReason
//       membawaSuratIjinArea
//       membawaSuratIjinAreaReason
//       membawaBukuSaku
//       membawaBukuSakuReason
//       membawaCatatanPerjalanan
//       membawaCatatanPerjalananReason
//       menggunakanSeragam
//       menggunakanSeragamReason
//       menggunakanSafetyShoes
//       menggunakanSafetyShoesReason
//       menggunakanSafetyHelm
//       menggunakanSafetyHelmReason
//       menggunakanIDCard
//       menggunakanIDCardReason
//       menggunakanSarungTangan
//       menggunakanSarungTanganReason
//       menggunakanJasHujan
//       menggunakanJamHujanReason
//     }
//   }
// `

// const mutationApprovalCheckList = gql`
//   mutation approvalCheckList($id: ID!, $approval: ApprovalChecklistInput!) {
//     approvalCheckList(id: $id, approval: $approval) {
//       _id
//       createdBy {
//         username
//         roles
//       }
//       mobiltangki {
//         nopol
//       }
//       status
//       approvedBy {
//         username
//         roles
//       }
//       rejectedReason
//       ritase
//       odoKM
//       HSSE
//       PWSAMT
//       TBBM
//       kondisiRem
//       kondisiRemReason
//       kondisiBan
//       kondisiBanReason
//     }
//   }
// `

class Checklist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showForm: false,
      itemData: null,
      loading: false,
      error: null,
      checklists: [],
    }

    this.handleRefresh = this.handleRefresh.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleEditItem = this.handleEditItem.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }

  componentDidMount() {
    this.handleRefresh()
  }

  handleRefresh() {
    fetch('http://seorangeksa.com:3030/api/checklist', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        token: localStorage.getItem('token'),
        Accept: 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    })
      .then(response => {
        return response.json()
      })
      .then(resp => {
        // console.log('GET RESPONSE DATA', resp)
        if (resp.status === 200) {
          this.setState({
            error: null,
            checklists: resp.data,
          })
        } else {
          this.setState({ error: resp })
        }
      })
      .catch(error => {
        console.log(error)
      })
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
      fetch(`http://seorangeksa.com:3030/api/checklist/approval/${item._id}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          token: localStorage.getItem('token'),
          Accept: 'application/json, application/xml, text/play, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        body: searchParams({
          status: 'Approved',
          rejectedReason: 'UPDATE STATUS',
        }),
      })
        .then(response => {
          return response.json()
        })
        .then(async resp => {
          console.log('GET RESPONSE DATA', resp)
          if (resp.status === 200) {
            notification['success']({
              message: 'Success Message',
              description: 'Success to update record!',
              style: { top: '35px' },
            })
            await this.handleRefresh()
          } else {
            notification['warning']({
              message: 'Validation Message',
              description: message(resp.message),
              style: { top: '35px' },
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      // this.props
      //   .onUpdateItem(this.state.itemData._id, item)
      //   .then(() => {
      //     notification['success']({
      //       message: 'Success Message',
      //       description: 'Success to update record!',
      //       style: { top: '35px' },
      //     })
      //     this.props.refetch()
      //     this.handleBack()
      //   })
      //   .catch(res => {
      //     notification['warning']({
      //       message: 'Validation Message',
      //       description: message(res.message), //res.message.replace('GraphQL error: ValidationError: ', ''),
      //       style: { top: '35px' },
      //     })
      //   })
    }
  }

  handleDeleteItem(id) {
    // this.props
    //   .onDeleteItem(id)
    //   .then(() => {
    //     notification['success']({
    //       message: 'Success Message',
    //       description: 'Success to delete record!',
    //       style: { top: '35px' },
    //     })
    //     this.props.refetch()
    //     this.handleBack()
    //   })
    //   .catch(res => {
    //     notification['warning']({
    //       message: 'Validation Message',
    //       description: message(res.message), //res.message.replace('GraphQL error: ValidationError: ', ''),
    //       style: { top: '35px' },
    //     })
    //   })
  }

  render() {
    // console.log('checklist props: ', this.props)
    const { loading, error, checklists } = this.state
    // const { loading, error, refetch, checklists = [] } = this.props

    return (
      <ChecklistRequest
        loading={loading}
        error={error}
        checklists={checklists}
        // onRefresh={() => refetch()}
        onRefresh={this.handleRefresh}
        onSubmit={this.handleSubmit}
        onAddItem={this.handleAddItem}
        onEditItem={this.handleEditItem}
        onDeleteItem={this.handleDeleteItem}
      />
    )
  }
}

// export default compose(
//   graphql(queryChecklists, {
//     options: {
//       fetchPolicy: 'cache-and-network',
//       errorPolicy: 'all',
//     },
//     props: ({ data }) => {
//       const { loading, error, refetch, checklists } = data
//       return loading
//         ? { loading, refetch }
//         : error
//         ? typeof error === 'object'
//           ? {
//               error: {
//                 message:
//                   'Your session expired. Sign in again!\nPlease wait until redirect to login page.',
//               },
//             }
//           : { error, refetch }
//         : { refetch, checklists }
//     },
//   }),
//   graphql(mutationApprovalCheckList, {
//     options: {
//       fetchPolicy: 'cache-and-network',
//       errorPolicy: 'all',
//     },
//     props: props => ({
//       onCreateItem: (id, approval) => {
//         return props.mutate({
//           variables: { id, approval },
//         })
//       },
//     }),
//   })
// )(Checklist)

export default Checklist
