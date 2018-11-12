import React, { Component } from 'react'
import moment from 'moment'
import { Row, Col, Card, Tag, Divider, Radio, Table, Icon, Alert, Modal, Button } from 'antd'

class ChecklistRequest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'Waiting',
      visibleDetail: false,
      item: null,
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

  handleShowDetail(item) {
    this.setState({
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
    const { status, visibleDetail } = this.state
    const { loading, error, onRefresh, checklists = [] } = this.props
    const itemChecklists =
      checklists !== null ? checklists.map(checklist => ({ ...checklist, key: checklist._id })) : []
    const dataSource =
      status === 'All'
        ? itemChecklists
        : itemChecklists.filter(checklist => checklist.status === status)

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
                title="Detail AMT Checklist"
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
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </div>
          )}
        </Card>
      </div>
    )
  }
}

export default ChecklistRequest
