import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Card, Col, Row, Form, Input, Radio, Button, Alert, Tag } from 'antd'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 19,
      offset: 5,
    },
  },
}

class AdminForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fileObjs: [],
    }

    this.form = props.form
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    this.form.validateFieldsAndScroll((err, itemData) => {
      if (!err) {
        this.props.onSubmitItem(itemData)
      }
    })
  }

  handleImageAdd(acceptedFiles, rejectedFiles) {
    this.setState(prevState => {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/File
      return {
        fileObjs: [...prevState.fileObjs, ...acceptedFiles],
      }
    })
  }

  handleImageClear() {
    this.setState({ fileObjs: [] })
  }

  render() {
    // console.log('user form props', this.props)
    const { getFieldDecorator } = this.props.form
    const { loading, error, onBack, itemData } = this.props

    return (
      <div className="animated fadeIn">
        <Card title={!itemData ? 'Create Admin' : 'Edit Admin'}>
          {error ? (
            <Alert message="Error" description={this.props.error.message} type="error" showIcon />
          ) : (
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span="12">
                  <Form.Item label="NIP" {...formItemLayout}>
                    {getFieldDecorator('NIP', {
                      initialValue: itemData && itemData.NIP,
                      rules: [{ required: true, message: 'Please input NIP!', whitespace: true }],
                    })(<Input placeholder="Input your NIP.." />)}
                  </Form.Item>
                  <Form.Item label="Full Name" {...formItemLayout}>
                    {getFieldDecorator('fullName', {
                      initialValue: itemData && itemData.fullName,
                      rules: [
                        { required: true, message: 'Please input full name!', whitespace: true },
                      ],
                    })(<Input placeholder="Input your full name.." />)}
                  </Form.Item>
                  <Form.Item label="Email" {...formItemLayout}>
                    {getFieldDecorator('email', {
                      initialValue: itemData && itemData.email,
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        { required: true, message: 'Please input email!', whitespace: true },
                      ],
                    })(<Input placeholder="Input your email.." />)}
                  </Form.Item>
                  <Form.Item label="Mobile No." {...formItemLayout}>
                    {getFieldDecorator('mobile', {
                      initialValue: itemData && itemData.mobile,
                      rules: [
                        { required: false, message: 'Please input mobile!', whitespace: true },
                      ],
                    })(<Input type="number" placeholder="Input your mobile.." />)}
                  </Form.Item>
                  <Form.Item label="Status" {...formItemLayout}>
                    {getFieldDecorator('status', {
                      initialValue: itemData && itemData.status,
                      rules: [
                        { required: true, message: 'Please select status!', whitespace: true },
                      ],
                    })(
                      <Radio.Group>
                        <Radio value="Active">Active</Radio>
                        <Radio value="Non-Active">Non-Active</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
                <Col span="12">
                  <Form.Item label="Photo" {...formItemLayout}>
                    {getFieldDecorator('imgUrl', {
                      rules: [{ required: false, message: 'Please input photo!' }],
                    })(
                      <section>
                        {this.state.fileObjs && this.state.fileObjs.length === 0 ? (
                          <Dropzone
                            onDrop={(acceptedFiles, rejectedFiles) =>
                              this.handleImageAdd(acceptedFiles)
                            }
                            multiple={false}
                            accept="image/*"
                            style={{
                              position: 'relative',
                              width: '100%',
                              height: '120px',
                              borderWidth: '1px',
                              borderColor: '#000000',
                              borderStyle: 'dashed',
                              borderRadius: '5px',
                              textAlign: 'center',
                            }}>
                            <div>Drop an image or click to select an image to upload.</div>
                          </Dropzone>
                        ) : (
                          <Tag
                            closable
                            onClose={() => this.handleImageClear()}
                            style={{
                              marginTop: '5px',
                              padding: '5px',
                              height: '100px',
                              width: '100%',
                              borderStyle: 'dashed',
                              borderWidth: '1px',
                              borderColor: '#000000',
                            }}>
                            <img
                              src={
                                this.state.fileObjs && URL.createObjectURL(this.state.fileObjs[0])
                              }
                              alt={this.state.fileObjs && this.state.fileObjs[0].name}
                              style={{ height: '90px', marginRight: '5px', verticalAlign: 'top' }}
                            />
                          </Tag>
                        )}
                      </section>
                    )}
                  </Form.Item>
                  <Form.Item label="Username" {...formItemLayout}>
                    {getFieldDecorator('username', {
                      initialValue: itemData && itemData.username,
                      rules: [
                        { required: true, message: 'Please input username!', whitespace: true },
                      ],
                    })(<Input placeholder="Input your username.." />)}
                  </Form.Item>
                  {!itemData && (
                    <Form.Item label="Password" {...formItemLayout}>
                      {getFieldDecorator('password', {
                        initialValue: itemData && itemData.password,
                        rules: [
                          { required: true, message: 'Please input password!', whitespace: true },
                        ],
                      })(<Input type="password" placeholder="Input your password.." />)}
                    </Form.Item>
                  )}
                </Col>
              </Row>

              <Form.Item {...tailFormItemLayout}>
                <Button loading={loading} type="primary" htmlType="submit">
                  {itemData === null ? 'Submit' : 'Update'}
                </Button>
                <Button
                  onClick={() => onBack()}
                  disabled={loading || error}
                  type="default"
                  style={{ marginLeft: '8px' }}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </div>
    )
  }
}

export default Form.create()(AdminForm)
