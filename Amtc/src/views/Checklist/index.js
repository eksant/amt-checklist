import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { Container, Body, Header, Left, Right, Tab, Tabs, ScrollableTab, Button } from 'native-base'

import ConnectAlert from '../../components/ConnectAlert'
import { getChecklist, createCheckList } from '../../store/checklist/checklist.actions'

import BasicInfo from './BasicInfo'
import CheckKondisi from './CheckKondisi'

class Checklist extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: 0,
      nopol: null,
      mobiltangkiId: 'f972d090-d563-11e8-b064-ed4d58da7351',
      status: 'Waiting',
      ritase: '',
      odoKM: '',
      HSSE: '',
      PWSAMT: '',
      TBBM: '',
      remarks: '',
      imgUrl: '',

      itemsKondisi: [
        {
          name: 'Kondisi Rem',
          status: 1,
          reason: '',
        },
        {
          name: 'Kondisi Ban',
          status: 1,
          reason: '',
        },
        {
          name: 'Kondisi Wiper',
          status: 1,
          reason: '',
        },
        {
          name: 'Kondisi Lampu',
          status: 1,
          reason: '',
        },
        {
          name: 'Kondisi Kompartemen',
          status: 1,
          reason: '',
        },
        {
          name: 'Kondisi Apar',
          status: 1,
          reason: '',
        },
        {
          name: 'Kondisi Oli Mesin',
          status: 1,
          reason: '',
        },
        {
          name: 'Kondisi Air Radiator',
          status: 1,
          reason: '',
        },
      ],

      itemsKeberadaan: [
        {
          name: 'Keberadaan STNK',
          status: 1,
          reason: '',
        },
        {
          name: 'Keberadaan Surat Keur',
          status: 1,
          reason: '',
        },
        {
          name: 'Keberadaan Surat Tera',
          status: 1,
          reason: '',
        },
        {
          name: 'Keberadaan P3K',
          status: 1,
          reason: '',
        },
        {
          name: 'Keberadaan Flame Trap',
          status: 1,
          reason: '',
        },
        {
          name: 'Keberadaan Ban Serep',
          status: 1,
          reason: '',
        },
        {
          name: 'Keberadaan Toolkit',
          status: 1,
          reason: '',
        },
        {
          name: 'Keberadaan Grounding Cable',
          status: 1,
          reason: '',
        },
        {
          name: 'Keberadaan Selang Bongkar',
          status: 1,
          reason: '',
        },
        {
          name: 'Keberadaan Spill Kit',
          status: 1,
          reason: '',
        },
      ],

      itemsMembawa: [
        {
          name: 'Membawa SIM',
          status: 1,
          reason: '',
        },
        {
          name: 'Membawa Surat Ijin Area',
          status: 1,
          reason: '',
        },
        {
          name: 'Membawa Buku Saku',
          status: 1,
          reason: '',
        },
        {
          name: 'Membawa Catatan Perjalanan',
          status: 1,
          reason: '',
        },
      ],

      itemsMenggunakan: [
        {
          name: 'Menggunakan Seragam',
          status: 1,
          reason: '',
        },
        {
          name: 'Menggunakan Safety Shoes',
          status: 1,
          reason: '',
        },
        {
          name: 'Menggunakan Safety Helm',
          status: 1,
          reason: '',
        },
        {
          name: 'Menggunakan ID Card',
          status: 1,
          reason: '',
        },
        {
          name: 'Menggunakan Sarung Tangan',
          status: 1,
          reason: '',
        },
        {
          name: 'Menggunakan Jas Hujan',
          status: 1,
          reason: '',
        },
      ],
    }

    this.baseState = this.state
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
    this.handleChangeReason = this.handleChangeReason.bind(this)
  }

  handleSubmit = () => {
    const item = {
      mobiltangkiId: this.state.mobiltangkiId,
      status: this.state.status,
      ritase: Number(this.state.ritase),
      odoKM: Number(this.state.odoKM),
      HSSE: this.state.HSSE,
      PWSAMT: this.state.PWSAMT,
      TBBM: this.state.TBBM,
      remarks: this.state.remarks,
      imgUrl: this.state.imgUrl,
      kondisiRem: Number(this.state.itemsKondisi[0].status),
      kondisiRemReason: this.state.itemsKondisi[0].reason,
      kondisiBan: Number(this.state.itemsKondisi[1].status),
      kondisiBanReason: this.state.itemsKondisi[1].reason,
      kondisiWiper: Number(this.state.itemsKondisi[2].status),
      kondisiWiperReason: this.state.itemsKondisi[2].reason,
      kondisiLampu: Number(this.state.itemsKondisi[3].status),
      kondisiLampuReason: this.state.itemsKondisi[3].reason,
      kondisiKompartemen: Number(this.state.itemsKondisi[4].status),
      kondisiKompartemenReason: this.state.itemsKondisi[4].reason,
      kondisiApar: Number(this.state.itemsKondisi[5].status),
      kondisiAparReason: this.state.itemsKondisi[5].reason,
      kondisiOliMesin: Number(this.state.itemsKondisi[6].status),
      kondisiOliMesinReason: this.state.itemsKondisi[6].reason,
      kondisiAirRadiator: Number(this.state.itemsKondisi[7].status),
      kondisiAirRadiatorReason: this.state.itemsKondisi[7].reason,
      keberadaanSTNK: Number(this.state.itemsKeberadaan[0].status),
      keberadaanSTNKReason: this.state.itemsKeberadaan[0].reason,
      keberadaanSuratKeur: Number(this.state.itemsKeberadaan[1].status),
      keberadaanSuratKeurReason: this.state.itemsKeberadaan[1].reason,
      keberadaanSuratTera: Number(this.state.itemsKeberadaan[2].status),
      keberadaanSuratTeraReason: this.state.itemsKeberadaan[2].reason,
      keberadaanP3K: Number(this.state.itemsKeberadaan[3].status),
      keberadaanP3KReason: this.state.itemsKeberadaan[3].reason,
      keberadaanFlameTrap: Number(this.state.itemsKeberadaan[4].status),
      keberadaanFlameTrapReason: this.state.itemsKeberadaan[4].reason,
      keberadaanBanSerep: Number(this.state.itemsKeberadaan[5].status),
      keberadaanBanSerepReason: this.state.itemsKeberadaan[5].reason,
      keberadaanToolkit: Number(this.state.itemsKeberadaan[6].status),
      keberadaanToolKitReason: this.state.itemsKeberadaan[6].reason,
      keberadaanGroundingCable: Number(this.state.itemsKeberadaan[7].status),
      keberadaanGroundingCableReason: this.state.itemsKeberadaan[7].reason,
      keberadaanSelangBongkar: Number(this.state.itemsKeberadaan[8].status),
      keberadaanSelangBongkarReason: this.state.itemsKeberadaan[8].reason,
      keberadaanSpillKit: Number(this.state.itemsKeberadaan[9].status),
      keberadaanSpillKitReason: this.state.itemsKeberadaan[9].reason,
      membawaSIM: Number(this.state.itemsMembawa[0].status),
      membawaSIMReason: this.state.itemsMembawa[0].reason,
      membawaSuratIjinArea: Number(this.state.itemsMembawa[1].status),
      membawaSuratIjinAreaReason: this.state.itemsMembawa[1].reason,
      membawaBukuSaku: Number(this.state.itemsMembawa[2].status),
      membawaBukuSakuReason: this.state.itemsMembawa[2].reason,
      membawaCatatanPerjalanan: Number(this.state.itemsMembawa[3].status),
      membawaCatatanPerjalananReason: this.state.itemsMembawa[3].reason,
      menggunakanSeragam: Number(this.state.itemsMenggunakan[0].status),
      menggunakanSeragamReason: this.state.itemsMenggunakan[0].reason,
      menggunakanSafetyShoes: Number(this.state.itemsMenggunakan[1].status),
      menggunakanSafetyShoesReason: this.state.itemsMenggunakan[1].reason,
      menggunakanSafetyHelm: Number(this.state.itemsMenggunakan[2].status),
      menggunakanSafetyHelmReason: this.state.itemsMenggunakan[2].reason,
      menggunakanIDCard: Number(this.state.itemsMenggunakan[3].status),
      menggunakanIDCardReason: this.state.itemsMenggunakan[3].reason,
      menggunakanSarungTangan: Number(this.state.itemsMenggunakan[4].status),
      menggunakanSarungTanganReason: this.state.itemsMenggunakan[4].reason,
      menggunakanJasHujan: Number(this.state.itemsMenggunakan[5].status),
      menggunakanJamHujanReason: this.state.itemsMenggunakan[5].reason,
    }

    this.props
      .createCheckList(item)
      .then(async resp => {
        if (resp.status === 200) {
          this.props.alertWithType('success', 'Success', 'Data success to submit!')
          await this.props.getChecklist()
          Actions.replace('dashboard')
        } else {
          this.props.alertWithType('error', 'Error', resp.message)
        }
      })
      .catch(err => {
        this.props.alertWithType('error', 'Error', err)
      })
  }

  handleClear() {
    this.setState(this.baseState)
  }

  handleChangeStatus(index) {
    const { currentTab } = this.state

    if (currentTab === 1) {
      let itemsKondisi = [...this.state.itemsKondisi]
      let item = { ...itemsKondisi[index] }
      item.status === 0 ? (item.status = 1) : (item.status = 0)
      item.reason = ''
      itemsKondisi[index] = item
      this.setState({ itemsKondisi })
    } else if (currentTab === 2) {
      let itemsKeberadaan = [...this.state.itemsKeberadaan]
      let item = { ...itemsKeberadaan[index] }
      item.status === 0 ? (item.status = 1) : (item.status = 0)
      item.reason = ''
      itemsKeberadaan[index] = item
      this.setState({ itemsKeberadaan })
    } else if (currentTab === 3) {
      let itemsMembawa = [...this.state.itemsMembawa]
      let item = { ...itemsMembawa[index] }
      item.status === 0 ? (item.status = 1) : (item.status = 0)
      item.reason = ''
      itemsMembawa[index] = item
      this.setState({ itemsMembawa })
    } else if (currentTab === 4) {
      let itemsMenggunakan = [...this.state.itemsMenggunakan]
      let item = { ...itemsMenggunakan[index] }
      item.status === 0 ? (item.status = 1) : (item.status = 0)
      item.reason = ''
      itemsMenggunakan[index] = item
      this.setState({ itemsMenggunakan })
    }
  }

  handleChangeReason(index, value) {
    const { currentTab } = this.state

    if (currentTab === 1) {
      let itemsKondisi = [...this.state.itemsKondisi]
      let item = { ...itemsKondisi[index] }
      item.reason = value
      itemsKondisi[index] = item
      this.setState({ itemsKondisi })
    } else if (currentTab === 2) {
      let itemsKeberadaan = [...this.state.itemsKeberadaan]
      let item = { ...itemsKeberadaan[index] }
      item.reason = value
      itemsKeberadaan[index] = item
      this.setState({ itemsKeberadaan })
    } else if (currentTab === 3) {
      let itemsMembawa = [...this.state.itemsMembawa]
      let item = { ...itemsMembawa[index] }
      item.reason = value
      itemsMembawa[index] = item
      this.setState({ itemsMembawa })
    } else if (currentTab === 4) {
      let itemsMenggunakan = [...this.state.itemsMenggunakan]
      let item = { ...itemsMenggunakan[index] }
      item.reason = value
      itemsMenggunakan[index] = item
      this.setState({ itemsMenggunakan })
    }
  }

  async componentDidMount() {
    const { amt } = this.props

    if (amt) {
      await this.setState({
        nopol: amt.nopol,
        mobiltangkiId: amt._id,
      })
    }
  }

  onChangeTab = ({ i }) => {
    this.setState({ currentTab: i })
  }

  onActionBack() {
    Actions.pop()
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left style={styles.headerLeftButton}>
            <Button transparent onPress={() => Actions.replace('dashboard')}>
              <FAIcon name={'chevron-circle-left'} size={22} style={styles.headerIcon} />
            </Button>
          </Left>
          <Body style={styles.headerTitleContent}>
            <Text style={styles.headerTitle}>Form Checklist</Text>
          </Body>
          <Right style={styles.headerRightButton}>
            <Button transparent onPress={() => this.handleSubmit()}>
              <FAIcon name={'save'} size={22} style={styles.headerIcon} />
            </Button>
            <Button transparent onPress={() => this.handleClear()}>
              <FAIcon name={'refresh'} size={22} style={styles.headerIcon} />
            </Button>
          </Right>
        </Header>

        <Tabs
          renderTabBar={() => <ScrollableTab />}
          initialPage={this.state.currentTab}
          onChangeTab={this.onChangeTab}
        >
          <Tab heading="Basic Info" tabStyle={styles.tabStyle}>
            <BasicInfo
              data={this.state}
              setState={p => {
                this.setState(p)
              }}
            />
          </Tab>
          <Tab heading="Cek Kondisi" tabStyle={styles.tabStyle}>
            <CheckKondisi
              data={this.state.itemsKondisi}
              onChangeStatus={this.handleChangeStatus}
              onChangeReason={this.handleChangeReason}
            />
          </Tab>
          <Tab heading="Cek Keberadaan" tabStyle={styles.tabStyle}>
            <CheckKondisi
              data={this.state.itemsKeberadaan}
              onChangeStatus={this.handleChangeStatus}
              onChangeReason={this.handleChangeReason}
            />
          </Tab>
          <Tab heading="Cek Bawaan" tabStyle={styles.tabStyle}>
            <CheckKondisi
              data={this.state.itemsMembawa}
              onChangeStatus={this.handleChangeStatus}
              onChangeReason={this.handleChangeReason}
            />
          </Tab>
          <Tab heading="Cek Penggunaan" tabStyle={styles.tabStyle}>
            <CheckKondisi
              data={this.state.itemsMenggunakan}
              onChangeStatus={this.handleChangeStatus}
              onChangeReason={this.handleChangeReason}
            />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 0,
  },
  header: {
    borderBottomWidth: 0.5,
    backgroundColor: '#4553B4',
    borderBottomColor: '#CBCBCB',
  },
  headerLeftButton: {
    flex: 1,
  },
  headerIcon: {
    color: '#fff',
  },
  headerTitleContent: {
    alignSelf: 'center',
  },
  headerTitle: {
    color: '#fff',
    alignItems: 'center',
  },
  headerRightButton: {
    flex: 1,
  },
  tabStyle: {
    backgroundColor: '#3E52D7',
  },
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getChecklist,
      createCheckList,
    },
    dispatch
  )

export default connect(
  null,
  mapDispatchToProps
)(ConnectAlert(Checklist))
