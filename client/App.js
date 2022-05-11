import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Sidebar from './components/Sidebar';
const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar>
        <Routes />
      </Sidebar>
    </div>
  );
};

export default App;
