import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col, Tabs, Card, Tag, Divider, Radio, Table, Icon, Alert, Modal, Button } from 'antd'

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
      title: 'Requested By',
      render: record => {
        return (
          <span>
            {record.createdBy.username} ({record.createdBy.roles})
          </span>
        )
      },
    },
    {
      title: 'AMT',
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
        const totalCheck = 5
        const totalUncheck = 10

        return <span>{`${totalCheck} check, ${totalUncheck} uncheck`}</span>
      },
    },
    {
      title: 'Action',
      render: record => (
        <span>
          <a href="#/approval-checklist" onClick={() => this.handleShowDetail(record)}>
            <Icon type="search" theme="outlined" /> Show Detail{' '}
            {record.status === 'Waiting' ? 'For Approval' : null}
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
    var arrCekKondisi = []

    for (const key of Object.keys(item)) {
      if (key.includes('kondisi')) {
        console.log(key, item[key])
        arrCekKondisi.push({
          status: item[key],
          name:
            key === 'kondisiRem'
              ? 'Kondisi Rem'
              : key === 'kondisiBan'
              ? 'Kondisi Ban'
              : key === 'kondisiWiper'
              ? 'Kondisi Wiper'
              : key === 'kondisiLampu'
              ? 'Kondisi Lampu'
              : key === 'kondisiKompartemen'
              ? 'Kondisi Kompartemen'
              : key === 'kondisiApar'
              ? 'Kondisi Apar'
              : key === 'kondisiOliMesin'
              ? 'Kondisi Oli Mesin'
              : key === 'kondisiAirRadiator'
              ? 'Kondisi Air Radiator'
              : null,
          reason:
            key === 'kondisiRemReason'
              ? item[key]
              : key === 'kondisiBanReason'
              ? item[key]
              : key === 'kondisiWiperReason'
              ? item[key]
              : key === 'kondisiLampuReason'
              ? item[key]
              : key === 'kondisiKompartemenReason'
              ? item[key]
              : key === 'kondisiAparReason'
              ? item[key]
              : key === 'kondisiOliMesinReason'
              ? item[key]
              : key === 'kondisiAirRadiatorReason'
              ? item[key]
              : null,
        })
      }
    }
    // arrCekKondisi.filter(item => {
    //   if (item.name === null) {
    //     console.log('kosong', item.na)
    //   }
    // })
    console.log(arrCekKondisi)

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

  handleApproval() {
    console.log('approval')
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

    // console.log(item)

    return (
      <div className="animated fadeIn">
        <Card
          title="Daily AMT Check"
          extra={
            <span>
              <a
                href="#/approval-checklist"
                onClick={() => onRefresh()}
                style={{ marginRight: '10px', color: '#A6A6A6' }}>
                <i className="fa fa-refresh" /> Refresh
              </a>
              <Divider type="vertical" />
              Status Request : &nbsp;
              <Radio.Group
                name="statusGroup"
                onChange={this.handleChangeStatus.bind(this)}
                defaultValue={status}>
                <Radio value="All">All</Radio>
                <Radio value="Waiting">Waiting</Radio>
                <Radio value="Approved">Approved</Radio>
                <Radio value="Rejected">Rejected</Radio>
              </Radio.Group>
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
                      Submit
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
                        Created By
                      </Col>
                    </Row>

                    <Row>
                      <Col span={18} push={6}>
                        : {item && item.mobiltangki.nopol}
                      </Col>
                      <Col span={6} pull={18}>
                        AMT
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
                    <Row>
                      <Col span={18} push={6}>
                        : {item && item.remarks}
                      </Col>
                      <Col span={6} pull={18}>
                        Remarks
                      </Col>
                    </Row>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Cek Kondisi" key="cekkondisi">
                    Content of Tab Pane 2
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Cek Keberadaan" key="cekkeberadaan">
                    Content of Tab Pane 3
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Cek Bawaan" key="cekbawaan">
                    Content of Tab Pane 3
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Cek Penggunaan" key="cekpenggunaan">
                    Content of Tab Pane 3
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
