import React, { Component } from 'react';
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
      showForm: false,
      act: 'Add'
    };

    this.showNewForm = this.showNewForm.bind(this);
  }

  showNewForm() {
    this.setState({
      showForm: !this.state.showForm,
      act: 'New'
    })
  }

  showEditForm(id) {
    this.setState({
      showForm: !this.state.showForm,
      act: 'Edit'
    })
  }

  render() {
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
                  <th>Date Registered</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Pompeius René</td>
                  <td>2012/01/01</td>
                  <td>Member</td>
                  <td>
                    <Badge color="success">Active</Badge>
                  </td>
                  <td>
                    <Button className="btn btn-outline-primary btn-sm"><i className="icon-note"></i></Button>{' '}
                    <Button className="btn btn-outline-danger btn-sm"><i className="icon-trash"></i></Button>
                  </td>
                </tr>
                <tr>
                  <td>Paĉjo Jadon</td>
                  <td>2012/02/01</td>
                  <td>Staff</td>
                  <td>
                    <Badge color="secondary">Disabled</Badge>
                  </td>
                  <td>
                    <Button onClick={() => this.showEditForm(1)} className="btn btn-outline-primary btn-sm"><i className="icon-note"></i></Button>{' '}
                    <Button className="btn btn-outline-danger btn-sm"><i className="icon-trash"></i></Button>
                  </td>
                </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Modal isOpen={this.state.showForm} toggle={this.showNewForm} className={'modal-lg ' + this.props.className}>
          <ModalHeader toggle={this.showNewForm}>{this.state.act} Admin</ModalHeader>
          <ModalBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="username">Username</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" id="username" name="username" placeholder="Enter Username" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email">Email</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="email" id="email" name="email" placeholder="Enter Email" autoComplete="email"/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="password">Password</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="password" id="password" name="password" placeholder="Enter Password" autoComplete="new-password" />
              </Col>
            </FormGroup>
          </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.showNewForm}>Save</Button>{' '}
            <Button color="secondary" onClick={this.showNewForm}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Admin;
