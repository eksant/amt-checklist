import React, { Component } from 'react'
import moment from 'moment'
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export'
import { Card, Table, Alert, Divider } from 'antd'

import { logout } from '../../utils/logout'

class ChecklistRequest extends Component {
  _exporter

  constructor(props) {
    super(props)

    this.state = {
      status: 'Approved',
    }
  }

  export = () => {
    this._exporter.save()
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
      title: 'No. Pol',
      dataIndex: 'mobiltangki.nopol',
    },
    {
      title: 'Kapasitas MT',
      dataIndex: 'mobiltangki.KL',
    },
    {
      title: 'Supir',
      dataIndex: 'createdBy.fullName',
    },
    {
      title: 'Kernet',
      dataIndex: 'remarks',
    },
    {
      title: 'Ritase',
      dataIndex: 'ritase',
    },
    {
      title: 'Count Check',
      dataIndex: 'totalCheck',
      // render: record => {
      // var totalCheck = 0
      // var totalUncheck = 0

      // for (const key of Object.keys(record)) {
      //   if (
      //     key.includes('kondisi') ||
      //     key.includes('keberadaan') ||
      //     key.includes('membawa') ||
      //     key.includes('menggunakan')
      //   ) {
      //     if (record[key] === 0) {
      //       totalUncheck++
      //     } else if (record[key] === 1) {
      //       totalCheck++
      //     }
      //   }
      // }

      // // return <span>{`${totalCheck} check, ${totalUncheck} uncheck`}</span>
      // return (
      //   <span>
      //     {totalCheck} <i className="fa fa-check-square" /> check - {totalUncheck}{' '}
      //     <i className="fa fa-window-close" /> uncheck
      //   </span>
      // )
      // },
    },
    {
      title: 'Count Uncheck',
      dataIndex: 'totalUncheck',
    },
    {
      title: 'Finished Date',
      key: 'updatedAt',
      render: record => {
        return <span>{moment(record.updatedAt).format('DD MMM YYYY hh:mm')}</span>
      },
    },
    {
      title: 'Finished By',
      dataIndex: 'approvedBy.fullName',
    },
    // {
    //   title: 'Status',
    //   render: record => {
    //     return (
    //       <Tag
    //         color={
    //           record.status === 'Waiting'
    //             ? '#2db7f5'
    //             : record.status === 'Request'
    //             ? '#108ee9'
    //             : record.status === 'Rejected'
    //             ? '#f50'
    //             : '#87d068'
    //         }>
    //         {record.status}
    //       </Tag>
    //     )
    //   },
    // },
  ]

  handleChangeStatus(e) {
    this.setState({
      status: e.target.value,
    })
  }

  render() {
    // console.log('checklist list props: ', props)
    const { status } = this.state
    const { loading, error, onRefresh, checklists = [] } = this.props
    const itemChecklists =
      checklists !== null
        ? checklists.map(checklist => {
            var totalCheck = 0
            var totalUncheck = 0

            for (const key of Object.keys(checklist)) {
              if (
                key.includes('kondisi') ||
                key.includes('keberadaan') ||
                key.includes('membawa') ||
                key.includes('menggunakan')
              ) {
                if (checklist[key] === 0) {
                  totalUncheck++
                } else if (checklist[key] === 1) {
                  totalCheck++
                }
              }
            }

            return {
              ...checklist,
              key: checklist._id,
              totalCheck: totalCheck,
              totalUncheck: totalUncheck,
            }
          })
        : []
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
          title="Daily AMT Checklist"
          extra={
            <span>
              <a
                href="#/report-daily-checklist"
                onClick={() => onRefresh()}
                disabled={error}
                style={{ marginRight: '10px', color: '#A6A6A6' }}>
                <i className="fa fa-refresh" /> Refresh
              </a>
              <Divider type="vertical" />
              {/* Status Request : &nbsp;
              <Radio.Group
                name="statusGroup"
                onChange={this.handleChangeStatus.bind(this)}
                defaultValue={status}
                disabled={error}>
                <Radio value="All">All</Radio>
                <Radio value="Waiting">Waiting</Radio>
                <Radio value="Approved">Approved</Radio>
                <Radio value="Rejected">Rejected</Radio>
              </Radio.Group> */}
              <a href="#/report-daily-checklist" onClick={this.export} disabled={error}>
                <i className="fa fa-download" /> Download Excel
              </a>

              <ExcelExport
                data={dataSource}
                fileName="daily-amt-checklist.xlsx"
                ref={exporter => {
                  this._exporter = exporter
                }}>
                <ExcelExportColumn
                  field="createdAt"
                  cellOptions={{ format: 'dd mmm yyyy hh:mm' }}
                  title="Created At"
                />
                <ExcelExportColumn field="mobiltangki.nopol" title="No.POl" />
                <ExcelExportColumn field="mobiltangki.KL" title="Kapasitas KL" />
                <ExcelExportColumn field="createdBy.fullName" title="Supir" />
                <ExcelExportColumn field="remarks" title="Kernet" />
                <ExcelExportColumn field="ritase" title="Ritase" />
                <ExcelExportColumn field="totalCheck" title="Count Check" />
                <ExcelExportColumn field="totalUncheck" title="Count Uncheck" />
                <ExcelExportColumn
                  field="updatedAt"
                  cellOptions={{ format: 'dd mmm yyyy hh:mm' }}
                  title="Finished Date"
                />
                <ExcelExportColumn field="approvedBy.fullName" title="Finished By" />
              </ExcelExport>
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
            </div>
          )}
        </Card>
      </div>
    )
  }
}

export default ChecklistRequest
