import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import Wallet from './components/Wallet';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SignupCard from './components/AuthForms/SignupCard';
import LoginCard from './components/AuthForms/LoginCard';
import { UserProvider } from './context/UserContext';
import { SocketProvider } from './context/SocketContext';
import EditProfile from './components/Rider/EditProfile';

export default function Routes() {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? (
        <UserProvider>
          <SocketProvider>
            <Sidebar>
              <Switch>
                <Route exact path="/wallet" component={Wallet} />
                <Route path="/" component={Home} />
                <Route exact path="/setting" component={EditProfile} />
                <Route path="/home" component={Home} />
                <Redirect to="/" />
              </Switch>
            </Sidebar>
          </SocketProvider>
        </UserProvider>
      ) : (
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={LoginCard} />
            <Route path="/login" component={LoginCard} />
            <Route path="/signup" component={SignupCard} />
            <Redirect to="/" />
          </Switch>
        </React.Fragment>
      )}
    </div>
  );
}
