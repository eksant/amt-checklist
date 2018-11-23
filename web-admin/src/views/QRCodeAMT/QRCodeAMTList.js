import React from 'react'
import { Row, Col, Card, Table, Icon, Alert, Modal } from 'antd'
import QRCode from 'qrcode.react'

export default props => {
  // console.log('mobiltangki list props: ', props)
  const { loading, error, mobiltangkis = [] } = props
  const dataSource =
    mobiltangkis !== null
      ? mobiltangkis.map(mobiltangki => ({ ...mobiltangki, key: mobiltangki._id }))
      : []

  const columns = [
    {
      title: 'No.Polisi',
      dataIndex: 'nopol',
    },
    {
      title: 'QR Code',
      render: record =>
        record ? (
          <span>
            <QRCode
              value={record.nopol}
              size={128}
              fgColor={'#000000'}
              bgColor={'#ffffff'}
              level={'L'}
              renderAs={'svg'}
            />
          </span>
        ) : null,
    },
    {
      title: 'KL',
      dataIndex: 'KL',
    },
    {
      title: 'Year',
      dataIndex: 'year',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      render: record => (
        <span>
          <a href="#/report-qrcode-mt" onClick={() => showQRCodeDetail(record)}>
            <Icon type="search" theme="outlined" /> Show Detail
          </a>
        </span>
      ),
    },
  ]

  const gutterBox = {
    padding: '5px',
    marginTop: '10px',
    marginBottom: '20px',
  }
  const gutterInfo = {
    marginTop: '10px',
    marginLeft: '10px',
  }

  const showQRCodeDetail = item => {
    Modal.info({
      title: ' Detail AMT No. Polisi ' + item.nopol,
      content: (
        <div className="gutter-example">
          <Row gutter={32} justify="center" align="top">
            <Col className="gutter-row" span={8}>
              <div className="gutter-box" style={gutterBox}>
                <QRCode
                  value={item.nopol}
                  size={128}
                  fgColor={'#000000'}
                  bgColor={'#ffffff'}
                  level={'L'}
                  renderAs={'svg'}
                />
              </div>
            </Col>
            <Col className="gutter-row" span={16}>
              <div className="gutter-box" style={gutterInfo}>
                <Row>
                  <Col span={8}>No. Pol</Col>
                  <Col span={10}>: {item.nopol}</Col>
                </Row>
                <Row>
                  <Col span={8}>KL</Col>
                  <Col span={10}>: {item.KL}</Col>
                </Row>
                <Row>
                  <Col span={8}>Year</Col>
                  <Col span={10}>: {item.year}</Col>
                </Row>
                <Row>
                  <Col span={8}>Status</Col>
                  <Col span={10}>: {item.status}</Col>
                </Row>
                <Row>
                  <Col span={8}>Created By</Col>
                  <Col span={10}>: {item.createdBy.username}</Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      ),
      onOk() {},
    })
  }

  return (
    <div className="animated fadeIn">
      <Card title="Report QRCode Mobil Tangki">
        {error ? (
          <Alert message="Error" description={this.props.error.message} type="error" showIcon />
        ) : (
          <Table columns={columns} dataSource={dataSource} loading={loading} size={'small'} />
        )}
      </Card>
    </div>
  )
}
