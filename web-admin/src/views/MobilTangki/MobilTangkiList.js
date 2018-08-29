import React from 'react'
import { Card, Table, Divider, Icon, Popconfirm, Alert } from 'antd'

export default props => {
  // console.log('user list props: ', props)
  const { loading, error, onRefresh, onAddItem, onEditItem, onDeleteItem } = props

  const data = [
    {
      key: '1',
      nopol: 'AD 1001 EK',
      KL: '16',
      year: '2012',
      status: 'Active',
    },
    {
      key: '2',
      nopol: 'AD 1002 EK',
      KL: '28',
      year: '2002',
      status: 'Active',
    },
    {
      key: '3',
      nopol: 'AD 1003 EK',
      KL: '32',
      year: '2014',
      status: 'Active',
    },
  ]

  const columns = [
    {
      title: 'No. Polisi',
      dataIndex: 'nopol',
      key: 'nopol',
    },
    {
      title: 'KL',
      dataIndex: 'KL',
      key: 'KL',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <span>
          <a href="#/users" onClick={() => onEditItem(record)}>
            <Icon type="edit" /> Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this record?"
            onConfirm={() => onDeleteItem(record.id)}
            okText="Yes"
            cancelText="No">
            <a href="#/users" className="ant-btn-danger ant-btn-background-ghost">
              <Icon type="delete" /> Delete
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ]

  return (
    <div className="animated fadeIn">
      <Card
        title="Manage Mobil Tangki"
        extra={
          <span>
            <a
              href="#/mobiltangkis"
              onClick={() => onRefresh()}
              style={{ marginRight: '10px', color: '#A6A6A6' }}>
              <i className="fa fa-refresh" /> Refresh
            </a>
            <a href="#/mobiltangkis" onClick={() => onAddItem()}>
              <i className="fa fa-plus-square" /> Create New
            </a>
          </span>
        }>
        {error ? (
          <Alert message="Error" description={this.props.error.message} type="error" showIcon />
        ) : (
          <Table columns={columns} dataSource={data} size={'small'} />
        )}
      </Card>
    </div>
  )
}
