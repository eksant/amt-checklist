import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss';
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss';

// Containers
import Full from './containers/Full/';

// Views
import Login from './views/Login/';

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" name="Login" component={Login}/>
        <Route path="/" name="Home" component={Full}/>
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
