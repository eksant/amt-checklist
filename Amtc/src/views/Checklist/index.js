import React, { Component } from 'react'
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Content,
  Tab,
  Tabs,
  ScrollableTab,
  Button,
  Icon
} from 'native-base'

import {Alert} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import ConnectAlert from '../../components/ConnectAlert'
import { createCheckList } from '../../store/checklist/checklist.actions'

import BasicInfo from './BasicInfo'
import CheckKondisi from './CheckKondisi'

class Checklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobiltangkiId: 'f972d090-d563-11e8-b064-ed4d58da7351',
      status: 'Waiting',
      ritase: '',
      odoKM: '',
      HSSE: '',
      PWSAMT: '',
      TBBM: '',
      remarks: '',
      imgUrl: '',
      currentTab: 0,

      itemsKondisi: [
        {
          name: 'Kondisi Rem',
          status: 0,
          reason: ''
        },
        {
          name: 'Kondisi Ban',
          status: 0,
          reason: ''
        },
        {
          name: 'Kondisi Wiper',
          status: 0,
          reason: ''
        },
        {
          name: 'Kondisi Lampu',
          status: 0,
          reason: ''
        },
        {
          name: 'Kondisi Kompartemen',
          status: 0,
          reason: ''
        },
        {
          name: 'Kondisi Apar',
          status: 0,
          reason: ''
        },
        {
          name: 'Kondisi Oli Mesin',
          status: 0,
          reason: ''
        },
        {
          name: 'Kondisi Air Radiator',
          status: 0,
          reason: ''
        },
      ],   
      
      itemsKeberadaan: [
        {
          name: 'Keberadaan STNK',
          status: 0,
          reason: ''
        },
        {
          name: 'Keberadaan Surat Keur',
          status: 0,
          reason: ''
        },
        {
          name: 'Keberadaan Surat Tera',
          status: 0,
          reason: ''
        },
        {
          name: 'Keberadaan P3K',
          status: 0,
          reason: ''
        },
        {
          name: 'Keberadaan Flame Trap',
          status: 0,
          reason: ''
        },
        {
          name: 'Keberadaan Ban Serep',
          status: 0,
          reason: ''
        },
        {
          name: 'Keberadaan Toolkit',
          status: 0,
          reason: ''
        },
        {
          name: 'Keberadaan Grounding Cable',
          status: 0,
          reason: ''
        },
        {
          name: 'Keberadaan Selang Bongkar',
          status: 0,
          reason: ''
        },
        {
          name: 'Keberadaan Spill Kit',
          status: 0,
          reason: ''
        },
      ],
      
      itemsMembawa: [
        {
          name: 'Membawa SIM',
          status: 0,
          reason: ''
        },
        {
          name: 'Membawa Surat Ijin Area',
          status: 0,
          reason: ''
        },
        {
          name: 'Membawa Buku Saku',
          status: 0,
          reason: ''
        },
        {
          name: 'Membawa Catatan Perjalanan',
          status: 0,
          reason: ''
        }
      ],

      itemsMenggunakan: [
        {
          name: 'Menggunakan Seragam',
          status: 0,
          reason: ''
        },
        {
          name: 'Menggunakan Safety Shoes',
          status: 0,
          reason: ''
        },
        {
          name: 'Menggunakan Safety Helm',
          status: 0,
          reason: ''
        },
        {
          name: 'Menggunakan ID Card',
          status: 0,
          reason: ''
        },
        {
          name: 'Menggunakan Sarung Tangan',
          status: 0,
          reason: ''
        },
        {
          name: 'Menggunakan Jas Hujan',
          status: 0,
          reason: ''
        }
      ],

    };

    this.handleActionConfirm = this.handleActionConfirm.bind(this);
    this.handleChangeReason = this.handleChangeReason.bind(this);
  }

  handleSubmit() {

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
      keberadaanSelangBongkar:Number( this.state.itemsKeberadaan[8].status),
      keberadaanSelangBongkarReason: this.state.itemsKeberadaan[8].reason,
      keberadaanSpillKit:Number( this.state.itemsKeberadaan[9].status),
      keberadaanSpillKitReason: this.state.itemsKeberadaan[9].reason,
      membawaSIM:Number( this.state.itemsMembawa[0].status),
      membawaSIMReason: this.state.itemsMembawa[0].reason,
      membawaSuratIjinArea: Number(this.state.itemsMembawa[1].status),
      membawaSuratIjinAreaReason: this.state.itemsMembawa[1].reason,
      membawaBukuSaku: Number(this.state.itemsMembawa[2].status),
      membawaBukuSakuReason: this.state.itemsMembawa[2].reason,
      membawaCatatanPerjalanan:Number( this.state.itemsMembawa[3].status),
      membawaCatatanPerjalananReason: this.state.itemsMembawa[3].reason,
      menggunakanSeragam:Number( this.state.itemsMenggunakan[0].status),
      menggunakanSeragamReason: this.state.itemsMenggunakan[0].reason,
      menggunakanSafetyShoes:Number( this.state.itemsMenggunakan[1].status),
      menggunakanSafetyShoesReason: this.state.itemsMenggunakan[1].reason,
      menggunakanSafetyHelm:Number( this.state.itemsMenggunakan[2].status),
      menggunakanSafetyHelmReason: this.state.itemsMenggunakan[2].reason,
      menggunakanIDCard: Number(this.state.itemsMenggunakan[3].status),
      menggunakanIDCardReason: this.state.itemsMenggunakan[3].reason,
      menggunakanSarungTangan: Number(this.state.itemsMenggunakan[4].status),
      menggunakanSarungTanganReason: this.state.itemsMenggunakan[4].reason,
      menggunakanJasHujan:Number( this.state.itemsMenggunakan[5].status),
      menggunakanJamHujanReason: this.state.itemsMenggunakan[5].reason
    };

    this.props
      .createCheckList(item)
      .then(resp => {
        if (resp.status === 200) {
          this.props.alertWithType('success', 'Success', 'Data success to submit!')
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
    this.setState({
      mobiltangkiId: 'f972d090-d563-11e8-b064-ed4d58da7351',
      status: 'Waiting',
      ritase: '',
      odoKM: '',
      HSSE: '',
      PWSAMT: '',
      TBBM: '',
      remarks: '',
      imgUrl: ''
    });
  }

  handleActionConfirm = (index) => {
    Alert.alert(
        'Please Confirm',
        'What do you want to do ?',
        [
          {
            text: 'Accept', 
            onPress: () => this.changeStatus(index,1)
          },
          {
            text: 'Reject', 
            onPress: () => this.changeStatus(index,2)
          },
          {
            text: 'Nothing', 
            onPress: () => this.changeStatus(index,0)
          },
        ],
        { cancelable: true }
      )
  }

  changeStatus = (index,value) => {
    const {currentTab} = this.state;
    
    if(currentTab === 1){
      let itemsKondisi = [...this.state.itemsKondisi];
      let item = {...itemsKondisi[index]};
      item.status = value;
      itemsKondisi[index] = item;
      this.setState({itemsKondisi});
    }
    else if(currentTab === 2){
      let itemsKeberadaan = [...this.state.itemsKeberadaan];
      let item = {...itemsKeberadaan[index]};
      item.status = value;
      itemsKeberadaan[index] = item;
      this.setState({itemsKeberadaan});
    }
    else if(currentTab === 3){
      let itemsMembawa = [...this.state.itemsMembawa];
      let item = {...itemsMembawa[index]};
      item.status = value;
      itemsMembawa[index] = item;
      this.setState({itemsMembawa});
    }
    else if(currentTab === 4){
      let itemsMenggunakan = [...this.state.itemsMenggunakan];
      let item = {...itemsMenggunakan[index]};
      item.status = value;
      itemsMenggunakan[index] = item;
      this.setState({itemsMenggunakan});
    }
  }

  handleChangeReason = (index,value) => {
    const {currentTab} = this.state;
    
    if(currentTab === 1){
      let itemsKondisi = [...this.state.itemsKondisi];
      let item = {...itemsKondisi[index]};
      item.reason = value;
      itemsKondisi[index] = item;
      this.setState({itemsKondisi});
    }
    else if(currentTab === 2){
      let itemsKeberadaan = [...this.state.itemsKeberadaan];
      let item = {...itemsKeberadaan[index]};
      item.reason = value;
      itemsKeberadaan[index] = item;
      this.setState({itemsKeberadaan});
    }
    else if(currentTab === 3){
      let itemsMembawa = [...this.state.itemsMembawa];
      let item = {...itemsMembawa[index]};
      item.reason = value;
      itemsMembawa[index] = item;
      this.setState({itemsMembawa});
    }
    else if(currentTab === 4){
      let itemsMenggunakan = [...this.state.itemsMenggunakan];
      let item = {...itemsMenggunakan[index]};
      item.reason = value;
      itemsMenggunakan[index] = item;
      this.setState({itemsMenggunakan});
    }
  }

  onChangeTab = ({ i }) => {
    this.setState({currentTab: i});
  }

  render() {
    
    return (
      <Container>
          <Header hasTabs>
            <Left>
              <Button transparent onPress={() => Actions.replace('dashboard')}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Form Checklist</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.handleSubmit()}>
                <Icon type="FontAwesome" name='save' />
              </Button>
              <Button transparent onPress={() => this.handleClear()}>
                <Icon type="FontAwesome" name='ban' />
              </Button>
            </Right>
          </Header>
          <Tabs 
            renderTabBar={() => <ScrollableTab />} 
            initialPage={this.state.currentTab} 
            onChangeTab={this.onChangeTab}>
            <Tab heading="Basic Info">
              <BasicInfo 
                  data={this.state}
                  setState={p=>{this.setState(p)}} 
              />
            </Tab>
            <Tab heading="Cek Kondisi">
              <CheckKondisi 
                data={this.state.itemsKondisi}
                onActionConfirm={this.handleActionConfirm}
                onChangeReason={this.handleChangeReason}/>
            </Tab>
            <Tab heading="Cek Keberadaan">
              <CheckKondisi 
                data={this.state.itemsKeberadaan}
                onActionConfirm={this.handleActionConfirm}
                onChangeReason={this.handleChangeReason}/>
            </Tab>
            <Tab heading="Cek Bawaan">
              <CheckKondisi 
                data={this.state.itemsMembawa}
                onActionConfirm={this.handleActionConfirm}
                onChangeReason={this.handleChangeReason}/>
            </Tab>
            <Tab heading="Cek Penggunaan">
              <CheckKondisi 
                data={this.state.itemsMenggunakan}
                onActionConfirm={this.handleActionConfirm}
                onChangeReason={this.handleChangeReason}/>
            </Tab>
        </Tabs>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createCheckList
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ConnectAlert(Checklist))

