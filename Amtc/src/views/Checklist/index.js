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
      ritase: null,
      odoKM: null,
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

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleActionConfirm = this.handleActionConfirm.bind(this);
    this.handleChangeReason = this.handleChangeReason.bind(this);
  }

  handleChangeText = fieldName => text => {
    this.setState({ [fieldName]: text })
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
      imgUrl: this.state.imgUrl
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
      let itemsKondisi = [...this.state.itemsKondisi];
      let item = {...itemsKondisi[index]};
      item.status = value;
      itemsKondisi[index] = item;
      this.setState({itemsKondisi});
  }

  handleChangeReason = (index,value) => {
      let itemsKondisi = [...this.state.itemsKondisi];
      let item = {...itemsKondisi[index]};
      item.reason = value;
      itemsKondisi[index] = item;
      this.setState({itemsKondisi});
  }

  onChangeTab = ({ i }) => {
    this.setState({currentTab: i});
    console.log("current tab: " + i)
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
              <Content>
              <BasicInfo 
                data={this.state}
                onChangeText={this.handleChangeText}/>
              </Content>
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

