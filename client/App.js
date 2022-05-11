import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Sidebar>
        <Routes />
      </Sidebar>
    </AuthProvider>
  );
};

export default App;
