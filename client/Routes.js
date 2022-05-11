import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import Blockchain from './components/Blockchain';
/**
 * COMPONENT
 */
export default class Routes extends Component {
  render() {
    const isLoggedIn = false;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/blockchain" component={Blockchain} />
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}
