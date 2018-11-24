import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import ReportDailyList from '../../views/ReportDaily/ReportDailyList'

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

class ReportDaily extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showForm: false,
      itemData: null,
    }

    this.handleAddItem = this.handleAddItem.bind(this)
    this.handleEditItem = this.handleEditItem.bind(this)
    this.handleBack = this.handleBack.bind(this)
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

  render() {
    // console.log('checklist props: ', this.props)
    const { loading, error, refetch, checklists = [] } = this.props

    return (
      <ReportDailyList
        loading={loading}
        error={error}
        checklists={checklists}
        onRefresh={() => refetch()}
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
        : { refetch, checklists }
    },
  })
)(ReportDaily)
