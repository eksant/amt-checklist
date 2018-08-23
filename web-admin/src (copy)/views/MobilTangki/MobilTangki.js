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

class MobilTangki extends Component {
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
              <i className="fa fa-align-justify"></i> Mobil Tangki
              <div className="card-actions">
                <Button onClick={this.showNewForm} className="btn btn-setting"><i className="fa fa-plus-square"></i></Button>
              </div>
            </CardHeader>
            <CardBody>
              <Table responsive bordered striped hover size="sm">
                <thead>
                <tr>
                  <th>Username</th>
                  <th>Date registered</th>
                  <th>Role</th>
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
          <ModalHeader toggle={this.showNewForm}>{this.state.act} Mobil Tangki</ModalHeader>
          <ModalBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Text Input</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                <FormText color="muted">This is a help text</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="email-input">Email Input</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"/>
                <FormText className="help-block">Please enter your email</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="password-input">Password</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                <FormText className="help-block">Please enter a complex password</FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="date-input">Date Input <Badge>NEW</Badge></Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="date" id="date-input" name="date-input" placeholder="date" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="textarea-input">Textarea</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                        placeholder="Content..." />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="select">Select</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="select" name="select" id="select">
                  <option value="0">Please select</option>
                  <option value="1">Option #1</option>
                  <option value="2">Option #2</option>
                  <option value="3">Option #3</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label>Inline Radios</Label>
              </Col>
              <Col md="9">
                <FormGroup check inline>
                  <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                  <Label className="form-check-label" check htmlFor="inline-radio1">One</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                  <Label className="form-check-label" check htmlFor="inline-radio2">Two</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="option3" />
                  <Label className="form-check-label" check htmlFor="inline-radio3">Three</Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label>Inline Checkboxes</Label>
              </Col>
              <Col md="9">
                <FormGroup check inline>
                  <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
                  <Label className="form-check-label" check htmlFor="inline-checkbox1">One</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                  <Label className="form-check-label" check htmlFor="inline-checkbox2">Two</Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                  <Label className="form-check-label" check htmlFor="inline-checkbox3">Three</Label>
                </FormGroup>
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

export default MobilTangki;
