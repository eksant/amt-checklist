import React from 'react'
import { Card, Table, Divider, Icon, Popconfirm, Alert } from 'antd'

export default props => {
  // console.log('user list props: ', props)
  const { loading, error, onRefresh, onAddItem, onEditItem, onDeleteItem, users = [] } = props
  const dataSource = users !== null ? users.map(user => ({ ...user, key: user._id })) : []

  const columns = [
    {
      title: 'NIP',
      dataIndex: 'NIP',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'roles',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      render: record => (
        <span>
          <a href="#/users" onClick={() => onEditItem(record)}>
            <Icon type="edit" theme="outlined" /> Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this record?"
            onConfirm={() => onDeleteItem(record._id)}
            okText="Yes"
            cancelText="No">
            <a href="#/users" className="ant-btn-danger ant-btn-background-ghost">
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
        title="Manage Users"
        extra={
          <span>
            <a
              href="#/users"
              onClick={() => onRefresh()}
              style={{ marginRight: '10px', color: '#A6A6A6' }}>
              <i className="fa fa-refresh" /> Refresh
            </a>
            <a href="#/users" onClick={() => onAddItem()}>
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
