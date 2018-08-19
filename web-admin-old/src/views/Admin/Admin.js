import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loading from '../Loading/';
import ButtonLoader from '../../components/ButtonLoader';
import { CreateAdmin, ReadAdmin } from '../../store/admins/admins.actions';
import { notification } from 'antd';
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
      isLoading: false
    };

    this.showNewForm = this.showNewForm.bind(this);
  }

  async componentDidMount() {
    await this.props.ReadAdmin()
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  showNewForm() {
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

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    if (this.state.act === 'Add') {
      let data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        roles: 2
      }


      this.props.CreateAdmin(data)
      .then((res) => {
        console.log('Admin res', res)
        event.target.reset()
        this.showNewForm()
        notification['success']({
          message: 'Notification Success',
          description: 'Success to insert new record',
        });
      })
    } else {

    }
    this.setState({ isLoading: false });
  }

  render() {
    const admins = this.props.admins

    if (admins.loading) {
      return <Loading />
    } else {
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
                      admins.datas.map((admin, i) => (
                        <tr key={i}>
                          <td>{admin.username}</td>
                          <td>{admin.email}</td>
                          <td>{admin.roles === 1 ? 'Superadmin' : 'Admin'}</td>
                          <td>
                            { admin.status === 1
                              ? <Badge color="success">Active</Badge>
                              : <Badge color="secondary">Disabled</Badge>
                            }                            
                          </td>
                          <td>
                            { admin.roles > 1 &&
                              <div>
                                <Button onClick={() => this.showEditForm(admin._id)} className="btn btn-outline-primary btn-sm"><i className="icon-note"></i></Button> 
                                <Button className="btn btn-outline-danger btn-sm"><i className="icon-trash"></i></Button>
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
            <Form onSubmit={this.handleSubmit} className="form-horizontal">
            <ModalHeader toggle={this.showNewForm}>{this.state.act} Admin</ModalHeader>
            <ModalBody>
              <FormGroup row>
                <Label for="username" md={3}>Username</Label>
                <Col xs="12" md="9">
                  <Input value={this.state.username} onChange={this.handleChange} type="text" id="username" name="username" placeholder="Enter Username" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="email" md={3}>Email</Label>
                <Col xs="12" md="9">
                  <Input value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="Enter Email" autoComplete="email"/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="password" md={3}>Password</Label>
                <Col xs="12" md="9">
                  <Input value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Enter Password" autoComplete="new-password" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="confirmPassword" md={3}>Confirm Password</Label>
                <Col xs="12" md="9">
                  <Input value={this.state.confirmPassword} onChange={this.handleChange} type="password" name="confirmPassword" placeholder="Enter Confirm Password" autoComplete="new-password" />
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
}

const mapStateToProps = (state) => ({
  admins: state.admins,
});

const mapDispacthToProps = (dispatch) => (
  bindActionCreators({
    CreateAdmin,
    ReadAdmin,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispacthToProps)(Admin);
