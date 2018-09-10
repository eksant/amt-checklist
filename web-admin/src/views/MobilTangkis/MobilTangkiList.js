import React from 'react'
import { Card, Table, Divider, Icon, Popconfirm, Alert } from 'antd'

export default props => {
  // console.log('mobiltangki list props: ', props)
  const { loading, error, onRefresh, onAddItem, onEditItem, onDeleteItem, mobiltangkis = [] } = props
  const dataSource = mobiltangkis !== null ? mobiltangkis.map(mobiltangki => ({ ...mobiltangki, key: mobiltangki._id })) : []

  const columns = [
    {
      title: 'No.Polisi',
      dataIndex: 'nopol',
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
          <a href="#/amts" onClick={() => onEditItem(record)}>
            <Icon type="edit" theme="outlined" /> Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this record?"
            onConfirm={() => onDeleteItem(record._id)}
            okText="Yes"
            cancelText="No">
            <a href="#/amts" className="ant-btn-danger ant-btn-background-ghost">
              <Icon type="delete" theme="outlined" /> Delete
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ]

  return (
    <div className="animated fadeIn">
      <Card
        title="Manage AMT"
        extra={
          <span>
            <a
              href="#/amts"
              onClick={() => onRefresh()}
              style={{ marginRight: '10px', color: '#A6A6A6' }}>
              <i className="fa fa-refresh" /> Refresh
            </a>
            <a href="#/amts" onClick={() => onAddItem()}>
              <i className="fa fa-plus-square" /> Create New
            </a>
          </span>
        }>
        {error ? (
          <Alert message="Error" description={this.props.error.message} type="error" showIcon />
        ) : (
          <Table columns={columns} dataSource={dataSource} loading={loading} size={'small'} />
        )}
      </Card>
    </div>
  )
}
