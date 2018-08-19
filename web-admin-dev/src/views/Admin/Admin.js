import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../Loading/';
import ButtonLoader from '../../components/ButtonLoader';
import { Modal as ModalAntd, notification } from 'antd';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  Label,
} from 'reactstrap';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      act: 'Add',
      username: 'admin',
      email: 'admin@email.com',
      password: 'password',
      confirmPassword: 'password',
      showForm: false,
      isLoading: false,
      datas: []
    };

    this.showNewForm = this.showNewForm.bind(this)
  }

  showNewForm() {
    console.log('open modal')
    this.setState({
      showForm: !this.state.showForm,
      act: 'Add'
    })
  }

  showEditForm(id) {
    this.setState({
      showForm: !this.state.showForm,
      act: 'Edit'
    })
  }

  validateForm() {
    return (
      this.state.username.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  componentDidMount() {
    this.handleLoadPage()
  }

  handleChange(field, e) {
    this.setState(Object.assign({}, this.state, {[field]: e.target.value}))
  }

  handleLoadPage() {
    axios.get('http://localhost:3030/api/users')
    .then(res => {
      this.setState({ datas: res.data })
    })
  }

  handleCreate = event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    if (this.state.act === 'Add') {
      let data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        roles: 2
      }
      axios.post('http://localhost:3030/api/users', data)
      .then(res => {
        console.log('res create', res)
      })
    } else {

    }
    this.setState({ isLoading: false });
  }

  handleDelete(id) {
    ModalAntd.confirm({
      title: 'Confirmation',
      content: 'Do you Want to delete these items ?',
      onOk() {
        // console.log('delete id', id);
        axios.delete(`http://localhost:3030/api/users/${id}`, {
          headers: { 'token': localStorage.getItem('token') }
        })
        .then(res => {
          console.log('res delete', res)
          this.handleLoadPage()
          notification['success']({
            message: 'Notification Success',
            description: 'Success to insert delete record',
          });
        })
      },
    });
  }

  render() {
    const datas = this.state.datas

    return (
      <div className="animated fadeIn">
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Admin
              <div className="card-actions">
                <Button onClick={this.showNewForm} className="btn-setting"><i className="fa fa-plus-square"></i></Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table responsive bordered striped hover size="sm">
                <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Roles</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                  {
                    datas.map((data, i) => (
                      <tr key={i}>
                        <td>{data.username}</td>
                        <td>{data.email}</td>
                        <td>{data.roles === 1 ? 'Superadmin' : 'Admin'}</td>
                        <td>
                          { data.status === 1
                            ? <Badge color="success">Active</Badge>
                            : <Badge color="secondary">Disabled</Badge>
                          }                            
                        </td>
                        <td>
                          { data.roles > 1 &&
                            <div>
                              <Button onClick={() => this.showEditForm(data._id)} className="btn btn-outline-primary btn-sm"><i className="icon-note"></i></Button>{' '}
                              <Button onClick={() => this.handleDelete(data._id)} className="btn btn-outline-danger btn-sm"><i className="icon-trash"></i></Button>
                            </div>
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Modal isOpen={this.state.showForm} toggle={this.showNewForm} className={'modal-lg ' + this.props.className}>
          <Form onSubmit={this.handleCreate} className="form-horizontal">
          <ModalHeader toggle={this.showNewForm}>{this.state.act} Admin</ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Label for="username" md={3}>Username</Label>
              <Col xs="12" md="9">
                <Input value={this.state.username} onChange={this.handleChange.bind(this, 'username')} type="text" placeholder="Enter Username" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" md={3}>Email</Label>
              <Col xs="12" md="9">
                <Input value={this.state.email} onChange={this.handleChange.bind(this, 'email')} type="email" placeholder="Enter Email" autoComplete="email"/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" md={3}>Password</Label>
              <Col xs="12" md="9">
                <Input value={this.state.password} onChange={this.handleChange.bind(this, 'password')} type="password" placeholder="Enter Password" autoComplete="new-password" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="confirmPassword" md={3}>Confirm Password</Label>
              <Col xs="12" md="9">
                <Input value={this.state.confirmPassword} onChange={this.handleChange.bind(this, 'confirmPassword')} type="password" placeholder="Enter Confirm Password" autoComplete="new-password" />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <ButtonLoader
              bsStyle="success"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Create Account"
              loadingText="Signing up…"
            />{' '}
            <Button color="secondary" onClick={this.showNewForm}>Cancel</Button>
          </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}


export default Admin;
