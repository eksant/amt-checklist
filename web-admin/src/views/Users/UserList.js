import React from 'react'
import { Card, Table, Divider, Icon, Popconfirm, Alert } from 'antd'

export default props => {
  // console.log('user list props: ', props)
  const { loading, error, onRefresh, onAddItem, onEditItem, onDeleteItem } = props

  const data = [
    {
      key: '1',
      nip: 'PN-001',
      fullName: 'John Brown',
      email: 'email@email.com',
      roles: 'Admin',
      status: 'Active',
    },
    {
      key: '2',
      nip: 'PN-002',
      fullName: 'Jim Green',
      email: 'email@email.com',
      roles: 'Sopir',
      status: 'Active',
    },
    {
      key: '3',
      nip: 'PN-003',
      fullName: 'Joe Black',
      email: 'email@email.com',
      roles: 'Kernet',
      status: 'Active',
    },
  ]

  const columns = [
    {
      title: 'NIP',
      dataIndex: 'nip',
      key: 'nip',
      // render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
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
          <Table columns={columns} dataSource={data} size={'small'} />
        )}
      </Card>
    </div>
  )
}
