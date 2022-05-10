import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Dashboard from './components/Dashboard';
const App = () => {
  return (
    <div>
      <Navbar />
      <Dashboard>
        <Routes />
      </Dashboard>
    </div>
  );
};

export default App;
