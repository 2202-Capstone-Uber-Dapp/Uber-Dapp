import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Dashboard>
        <Routes />
      </Dashboard>
    </AuthProvider>
  );
};

export default App;
