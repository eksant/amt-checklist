import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col, Tabs, Card, Tag, Table, Icon, Alert, Modal, Button } from 'antd'

import { logout } from '../../utils/logout'

class ChecklistRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'Waiting',
      visibleDetail: false,
      item: null,
      cekKondisi: null,
    }
  }

  columns = [
    {
      title: 'Created Date',
      key: 'createdAt',
      render: record => {
        return <span>{moment(record.createdAt).format('DD MMM YYYY hh:mm')}</span>
      },
    },
    {
      title: 'Supir',
      render: record => {
        return <span>{record.createdBy.username}</span>
      },
    },
    {
      title: 'Kernet',
      dataIndex: 'remarks',
    },
    {
      title: 'No. Pol',
      dataIndex: 'mobiltangki.nopol',
    },
    {
      title: 'Status',
      render: record => {
        return (
          <Tag
            color={
              record.status === 'Waiting'
                ? '#2db7f5'
                : record.status === 'Request'
                ? '#108ee9'
                : record.status === 'Rejected'
                ? '#f50'
                : '#87d068'
            }>
            {record.status}
          </Tag>
        )
      },
    },
    {
      title: 'Count Checklist',
      render: record => {
        var totalCheck = 0
        var totalUncheck = 0

        for (const key of Object.keys(record)) {
          if (
            key.includes('kondisi') ||
            key.includes('keberadaan') ||
            key.includes('membawa') ||
            key.includes('menggunakan')
          ) {
            if (record[key] === 0) {
              totalUncheck++
            } else if (record[key] === 1) {
              totalCheck++
            }
          }
        }

        // return <span>{`${totalCheck} check, ${totalUncheck} uncheck`}</span>
        return (
          <span>
            {totalCheck} <i className="fa fa-check-square" /> check - {totalUncheck}{' '}
            <i className="fa fa-window-close" /> uncheck
          </span>
        )
      },
    },
    {
      title: 'Action',
      render: record => (
        <span>
          <a href="#/approval-checklist" onClick={() => this.handleShowDetail(record)}>
            <Icon type="search" theme="outlined" /> Show Detail{' '}
            {record.status === 'Waiting' ? 'For Finishing' : null}
          </a>
        </span>
      ),
    },
  ]

  handleChangeStatus(e) {
    this.setState({
      status: e.target.value,
    })
  }

  async handleShowDetail(item) {
    // console.log(item)
    // var arrCekKondisi = []
    // for (const key of Object.keys(item)) {
    //   if (key.includes('kondisi')) {
    //     console.log(key, item[key])
    //     arrCekKondisi.push({
    //       status: item[key],
    //       name:
    //         key === 'kondisiRem'
    //           ? 'Kondisi Rem'
    //           : key === 'kondisiBan'
    //           ? 'Kondisi Ban'
    //           : key === 'kondisiWiper'
    //           ? 'Kondisi Wiper'
    //           : key === 'kondisiLampu'
    //           ? 'Kondisi Lampu'
    //           : key === 'kondisiKompartemen'
    //           ? 'Kondisi Kompartemen'
    //           : key === 'kondisiApar'
    //           ? 'Kondisi Apar'
    //           : key === 'kondisiOliMesin'
    //           ? 'Kondisi Oli Mesin'
    //           : key === 'kondisiAirRadiator'
    //           ? 'Kondisi Air Radiator'
    //           : null,
    //       reason:
    //         key === 'kondisiRemReason'
    //           ? item[key]
    //           : key === 'kondisiBanReason'
    //           ? item[key]
    //           : key === 'kondisiWiperReason'
    //           ? item[key]
    //           : key === 'kondisiLampuReason'
    //           ? item[key]
    //           : key === 'kondisiKompartemenReason'
    //           ? item[key]
    //           : key === 'kondisiAparReason'
    //           ? item[key]
    //           : key === 'kondisiOliMesinReason'
    //           ? item[key]
    //           : key === 'kondisiAirRadiatorReason'
    //           ? item[key]
    //           : null,
    //     })
    //   }
    // }
    // arrCekKondisi.filter(item => {
    //   if (item.name === null) {
    //     console.log('kosong', item.na)
    //   }
    // })
    // console.log(arrCekKondisi)

    await this.setState({
      item: item,
      visibleDetail: true,
    })
  }

  handleCloseDetail() {
    this.setState({
      item: null,
      visibleDetail: false,
    })
  }

  async handleApproval() {
    // console.log('approval', this.state.item)
    await this.props.onSubmit(this.state.item)
    this.handleCloseDetail()
  }

  render() {
    // console.log('checklist list props: ', props)
    const { status, visibleDetail, item } = this.state
    const { loading, error, onRefresh, checklists = [] } = this.props
    const itemChecklists =
      checklists !== null ? checklists.map(checklist => ({ ...checklist, key: checklist._id })) : []
    const dataSource =
      status === 'All'
        ? itemChecklists
        : itemChecklists.filter(checklist => checklist.status === status)

    if (error && error.message.indexOf('session expired')) {
      setTimeout(() => {
        logout()
      }, 3000)
    }

    return (
      <div className="animated fadeIn">
        <Card
          title="Approval Checklist"
          extra={
            <span>
              <a
                href="#/approval-checklist"
                onClick={() => onRefresh()}
                disabled={error}
                style={{ marginRight: '10px', color: '#A6A6A6' }}>
                <i className="fa fa-refresh" /> Refresh
              </a>
              {/* <Divider type="vertical" />
              Status Request : &nbsp;
              <Radio.Group
                name="statusGroup"
                onChange={this.handleChangeStatus.bind(this)}
                defaultValue={status}
                disabled={error}>
                <Radio value="All">All</Radio>
                <Radio value="Waiting">Waiting</Radio>
                <Radio value="Approved">Finishing</Radio>
                <Radio value="Rejected">Rejected</Radio>
              </Radio.Group> */}
            </span>
          }>
          {error ? (
            <Alert message="Error" description={error.message} type="error" showIcon />
          ) : (
            <div>
              <Table
                columns={this.columns}
                dataSource={dataSource}
                loading={loading}
                size={'small'}
              />

              <Modal
                visible={visibleDetail}
                title={`Detail AMT Checklist ${item && item.mobiltangki.nopol} - ${item &&
                  item.createdBy.username}`}
                width="700px"
                // onOk={this.handleApproval.bind(this)}
                onCancel={this.handleCloseDetail.bind(this)}
                footer={[
                  <Button key="back" onClick={this.handleCloseDetail.bind(this)}>
                    Close
                  </Button>,
                  status === 'Waiting' ? (
                    <Button
                      key="submit"
                      type="primary"
                      loading={loading}
                      onClick={this.handleApproval.bind(this)}>
                      Finishing
                    </Button>
                  ) : null,
                ]}>
                <Tabs type="card">
                  <Tabs.TabPane tab="Basic Info" key="basicinfo">
                    <Row>
                      <Col span={18} push={6}>
                        : {item && moment(item.createdAt).format('DD MMM YYYY hh:mm')}
                      </Col>
                      <Col span={6} pull={18}>
                        Created Date
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18} push={6}>
                        : {item && item.createdBy.username}
                      </Col>
                      <Col span={6} pull={18}>
                        Supir
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18} push={6}>
                        : {item && item.remarks}
                      </Col>
                      <Col span={6} pull={18}>
                        Kernet
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col span={18} push={6}>
                        : {item && item.createdBy.roles}
                      </Col>
                      <Col span={6} pull={18}>
                        Roles
                      </Col>
                    </Row> */}
                    <Row>
                      <Col span={18} push={6}>
                        : {item && item.mobiltangki.nopol}
                      </Col>
                      <Col span={6} pull={18}>
                        No. Pol
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18} push={6}>
                        : {item && item.ritase}
                      </Col>
                      <Col span={6} pull={18}>
                        Ritase
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18} push={6}>
                        : {item && item.odoKM}
                      </Col>
                      <Col span={6} pull={18}>
                        Odo KM
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18} push={6}>
                        : {item && item.HSSE}
                      </Col>
                      <Col span={6} pull={18}>
                        HSSE
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18} push={6}>
                        : {item && item.PWSAMT}
                      </Col>
                      <Col span={6} pull={18}>
                        PWSAMT
                      </Col>
                    </Row>
                    <Row>
                      <Col span={18} push={6}>
                        : {item && item.TBBM}
                      </Col>
                      <Col span={6} pull={18}>
                        TBBM
                      </Col>
                    </Row>
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Cek Kondisi" key="cekkondisi">
                    <Row>
                      {item && item.kondisiRem === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Kondisi Rem
                    </Row>
                    {item && item.kondisiRem === 0 && (
                      <Row>Reason: {item && item.kondisiRemReason}</Row>
                    )}
                    <Row>
                      {item && item.kondisiBan === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Kondisi Ban
                    </Row>
                    {item && item.kondisiBan === 0 && (
                      <Row>Reason: {item && item.kondisiBanReason}</Row>
                    )}
                    <Row>
                      {item && item.kondisiWiper === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Kondisi Wiper
                    </Row>
                    {item && item.kondisiWiper === 0 && (
                      <Row>Reason: {item && item.kondisiWiperReason}</Row>
                    )}
                    <Row>
                      {item && item.kondisiLampu === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Kondisi Lampu
                    </Row>
                    {item && item.kondisiLampu === 0 && (
                      <Row>Reason: {item && item.kondisiLampuReason}</Row>
                    )}
                    <Row>
                      {item && item.kondisiKompartemen === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Kondisi Kompartemen
                    </Row>
                    {item && item.kondisiKompartemen === 0 && (
                      <Row>Reason: {item && item.kondisiKompartemenReason}</Row>
                    )}
                    <Row>
                      {item && item.kondisiApar === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Kondisi Apar
                    </Row>
                    {item && item.kondisiApar === 0 && (
                      <Row>Reason: {item && item.kondisiAparReason}</Row>
                    )}
                    <Row>
                      {item && item.kondisiOliMesin === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Kondisi Oli Mesin
                    </Row>
                    {item && item.kondisiOliMesin === 0 && (
                      <Row>Reason: {item && item.kondisiOliMesinReason}</Row>
                    )}
                    <Row>
                      {item && item.kondisiAirRadiator === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Kondisi Air Radiator
                    </Row>
                    {item && item.kondisiAirRadiator === 0 && (
                      <Row>Reason: {item && item.kondisiAirRadiatorReason}</Row>
                    )}
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Cek Keberadaan" key="cekkeberadaan">
                    <Row>
                      {item && item.keberadaanSTNK === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Keberadaan STNK
                    </Row>
                    {item && item.keberadaanSTNK === 0 && (
                      <Row>Reason: {item && item.keberadaanSTNKReason}</Row>
                    )}
                    <Row>
                      {item && item.keberadaanSuratKeur === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Keberadaan Surat Keur
                    </Row>
                    {item && item.keberadaanSuratKeur === 0 && (
                      <Row>Reason: {item && item.keberadaanSuratKeurReason}</Row>
                    )}
                    <Row>
                      {item && item.keberadaanSuratTera === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Keberadaan Surat Tera
                    </Row>
                    {item && item.keberadaanSuratTera === 0 && (
                      <Row>Reason: {item && item.keberadaanSuratTeraReason}</Row>
                    )}
                    <Row>
                      {item && item.keberadaanP3K === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Keberadaan P3K
                    </Row>
                    {item && item.keberadaanP3K === 0 && (
                      <Row>Reason: {item && item.keberadaanP3KReason}</Row>
                    )}
                    <Row>
                      {item && item.keberadaanFlameTrap === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Keberadaan Flame Trap
                    </Row>
                    {item && item.keberadaanFlameTrap === 0 && (
                      <Row>Reason: {item && item.keberadaanFlameTrapReason}</Row>
                    )}
                    <Row>
                      {item && item.keberadaanBanSerep === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Keberadaan Ban Serep
                    </Row>
                    {item && item.keberadaanBanSerep === 0 && (
                      <Row>Reason: {item && item.keberadaanBanSerepReason}</Row>
                    )}
                    <Row>
                      {item && item.keberadaanToolkit === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Keberadaan Toolkit
                    </Row>
                    {item && item.keberadaanToolkit === 0 && (
                      <Row>Reason: {item && item.keberadaanToolkitReason}</Row>
                    )}
                    <Row>
                      {item && item.keberadaanGroundingCable === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Keberadaan Grounding Cable
                    </Row>
                    {item && item.keberadaanGroundingCable === 0 && (
                      <Row>Reason: {item && item.keberadaanGroundingCableReason}</Row>
                    )}
                    <Row>
                      {item && item.keberadaanSelangBongkar === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Keberadaan Selang Bongkar
                    </Row>
                    {item && item.keberadaanSelangBongkar === 0 && (
                      <Row>Reason: {item && item.keberadaanSelangBongkarReason}</Row>
                    )}
                    <Row>
                      {item && item.keberadaanSpillKit === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Keberadaan Spill Kit
                    </Row>
                    {item && item.keberadaanSpillKit === 0 && (
                      <Row>Reason: {item && item.keberadaanSpillKitReason}</Row>
                    )}
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Cek Bawaan" key="cekbawaan">
                    <Row>
                      {item && item.membawaSIM === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Membawa SIM
                    </Row>
                    {item && item.membawaSIM === 0 && (
                      <Row>Reason: {item && item.membawaSIMReason}</Row>
                    )}
                    <Row>
                      {item && item.membawaSuratIjinArea === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Membawa Surat Ijin Area
                    </Row>
                    {item && item.membawaSuratIjinArea === 0 && (
                      <Row>Reason: {item && item.membawaSuratIjinAreaReason}</Row>
                    )}
                    <Row>
                      {item && item.membawaBukuSaku === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Membawa Buku Saku
                    </Row>
                    {item && item.membawaBukuSaku === 0 && (
                      <Row>Reason: {item && item.membawaBukuSakuReason}</Row>
                    )}
                    <Row>
                      {item && item.membawaCatatanPerjalanan === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Membawa Catatan Perjalanan
                    </Row>
                    {item && item.membawaCatatanPerjalanan === 0 && (
                      <Row>Reason: {item && item.membawaCatatanPerjalananReason}</Row>
                    )}
                  </Tabs.TabPane>

                  <Tabs.TabPane tab="Cek Penggunaan" key="cekpenggunaan">
                    <Row>
                      {item && item.menggunakanSeragam === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Menggunakan Seragam
                    </Row>
                    {item && item.menggunakanSeragam === 0 && (
                      <Row>Reason: {item && item.menggunakanSeragamReason}</Row>
                    )}
                    <Row>
                      {item && item.menggunakanSafetyShoes === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Menggunakan Safety Shoes
                    </Row>
                    {item && item.menggunakanSafetyShoes === 0 && (
                      <Row>Reason: {item && item.menggunakanSafetyShoesReason}</Row>
                    )}
                    <Row>
                      {item && item.menggunakanSafetyHelm === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Menggunakan Safety Helm
                    </Row>
                    {item && item.menggunakanSafetyHelm === 0 && (
                      <Row>Reason: {item && item.menggunakanSafetyHelmReason}</Row>
                    )}
                    <Row>
                      {item && item.menggunakanIDCard === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Menggunakan ID Card
                    </Row>
                    {item && item.menggunakanIDCard === 0 && (
                      <Row>Reason: {item && item.menggunakanIDCardReason}</Row>
                    )}
                    <Row>
                      {item && item.menggunakanSarungTangan === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Menggunakan Sarung Tangan
                    </Row>
                    {item && item.menggunakanSarungTangan === 0 && (
                      <Row>Reason: {item && item.menggunakanSarungTanganReason}</Row>
                    )}
                    <Row>
                      {item && item.menggunakanJasHujan === 1 ? (
                        <i className="fa fa-check-square" />
                      ) : (
                        <i className="fa fa-window-close" />
                      )}{' '}
                      Menggunakan Jas Hujan
                    </Row>
                    {item && item.menggunakanJasHujan === 0 && (
                      <Row>Reason: {item && item.menggunakanJasHujanReason}</Row>
                    )}
                  </Tabs.TabPane>
                </Tabs>
              </Modal>
            </div>
          )}
        </Card>
      </div>
    )
  }
}

export default ChecklistRequest
