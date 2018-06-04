import React, {Component} from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { notification } from 'antd';
import logo from '../../../public/img/logo-symbol.png';
import { GetAdminLogin } from "../../store/admins/admins.actions";
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
  InputGroupText
} from 'reactstrap';

class Login extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin(event) {
    event.preventDefault()

    if (this.state.email === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Email must be filled !!',
      });
    } else if (this.state.password === '') {
      notification['warning']({
        message: 'Notification Required',
        description: 'Password must be filled !!',
      });
    } else {
      let result = null
      // this.props.GetAdminLogin(this.state.email, this.state.password)
      axios.post('http://localhost:3030/api/users/auth', {
        email: this.state.email,
        password: this.state.password
      })
      .then(resp => {
        if (resp.data.token) {
          localStorage.setItem('username', resp.data.users.username)
          localStorage.setItem('token', resp.data.token)
          this.props.history.push('/dashboard')
        } else {
          notification['warning']({
            message: 'Notification Login',
            description: 'Invalid Username or Password !!',
          });
        }
      })
      .catch(err => {
        console.log('err', err)
      })
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
                    <Form onSubmit={this.handleLogin} className="form-horizontal">
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="email" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Email"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          {/* <Button color="link" className="px-0">Forgot password?</Button> */}
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <img src={logo} alt="Pertamina" height="200px"/>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  admins: state.admins,
});

const mapDispacthToProps = (dispatch) => (
  bindActionCreators({
    GetAdminLogin
  }, dispatch)
);

export default connect(mapStateToProps, mapDispacthToProps)(Login);
