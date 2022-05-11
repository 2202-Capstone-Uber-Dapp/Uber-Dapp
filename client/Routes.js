import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Blockchain from './components/Blockchain';
import { useAuth } from './context/AuthContext';

export default function Routes() {
  const { currentUser } = useAuth();
  return (
    <div>
      {currentUser ? (
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
