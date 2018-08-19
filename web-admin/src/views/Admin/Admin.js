import React, { Component } from 'react';
import ButtonLoader from '../../components/ButtonLoader';
import {
  Badge,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
} from 'reactstrap';

class Admin extends Component {
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
                  <th>Roles</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                  
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </div>
    )
  }
}


export default Admin;
