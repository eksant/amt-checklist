import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Auth } from '../../services/Auth';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import Admin from '../../views/Admin/';
import User from '../../views/User/';
import MobilTangki from '../../views/MobilTangki/';
import Checklist from '../../views/Checklist/';

class Full extends Component {
  render() {
    if (!Auth.authenticated()) {
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
                  <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                  <Route path="/admin" name="Admin" component={Admin}/>
                  <Route path="/user" name="User" component={User}/>
                  <Route path="/mobil-tangki" name="MobilTangki" component={MobilTangki}/>
                  <Route path="/checklist" name="Checklist" component={Checklist}/>
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
