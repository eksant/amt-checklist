import React from 'react'
import { Card, Table, Divider, Icon, Popconfirm, Alert } from 'antd'

export default props => {
  // console.log('admin list props: ', props)
  const { loading, error, onRefresh, onAddItem, onEditItem, onDeleteItem, admins = [] } = props
  const dataSource = admins !== null ? admins.map(admin => ({ ...admin, key: admin._id })) : []

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
          <a href="#/admins" onClick={() => onEditItem(record)}>
            <Icon type="edit" theme="outlined" /> Edit
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this record?"
            onConfirm={() => onDeleteItem(record._id)}
            okText="Yes"
            cancelText="No">
            <a href="#/admins" className="ant-btn-danger ant-btn-background-ghost">
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
        title="Manage Admins"
        extra={
          <span>
            <a
              href="#/admins"
              onClick={() => onRefresh()}
              style={{ marginRight: '10px', color: '#A6A6A6' }}>
              <i className="fa fa-refresh" /> Refresh
            </a>
            <a href="#/admins" onClick={() => onAddItem()}>
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
