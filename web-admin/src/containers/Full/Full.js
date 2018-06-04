import React, {Component} from 'react';
import {Link, Switch, BrowserRouter, Router, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Login from '../../views/Login/';
import Dashboard from '../../views/Dashboard/';
import Admin from '../../views/Admin/';
import User from '../../views/User/';
import MobilTangki from '../../views/MobilTangki/';
import Checklist from '../../views/Checklist/';

class Full extends Component {
  render() {
    if (!localStorage.getItem('username') && !localStorage.getItem('token')) {
      return <Redirect from="/" to="/login"/>
    } else {
      return (
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar {...this.props}/>
            <main className="main">
              <Breadcrumb />
              <Container fluid>
                <Switch>
                  <BrowserRouter path="/dashboard" name="Dashboard" component={Dashboard}/>
                  <BrowserRouter path="/admin" name="Admin" component={Admin}/>
                  <BrowserRouter path="/user" name="User" component={User}/>
                  <BrowserRouter path="/mobil-tangki" name="MobilTangki" component={MobilTangki}/>
                  <BrowserRouter path="/checklist" name="Checklist" component={Checklist}/>
                  <Redirect from="/" to="/dashboard"/>
                </Switch>
              </Container>
            </main>
            <Aside />
          </div>
          <Footer />
        </div>
      );
    }
  }
}

export default Full;
