import React, { Component } from 'react'
import { notification } from 'antd'
import logo from '../../../public/img/logo-symbol.png'
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBody,
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap'

export default class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: 'superadmin@email.com',
      password: 'password',
    }
  }

  handleChange(field, e) {
    this.setState(Object.assign({}, this.state, { [field]: e.target.value }))
  }

  handleLogin(event) {
    event.preventDefault()

    if (this.state.email === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Email must be filled !!',
      })
    } else if (this.state.password === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Password must be filled !!',
      })
    } else {
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Form onSubmit={this.handleLogin.bind(this)} className="form-horizontal">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={this.state.email}
                          onChange={this.handleChange.bind(this, 'email')}
                          type="email"
                          placeholder="Email"
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={this.state.password}
                          onChange={this.handleChange.bind(this, 'password')}
                          type="password"
                          placeholder="Password"
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          {/* <Button color="link" className="px-0">Forgot password?</Button> */}
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <img src={logo} alt="Pertamina" height="200px" />
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
