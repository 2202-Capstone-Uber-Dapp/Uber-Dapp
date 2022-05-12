import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Sidebar from './components/Sidebar';
const App = () => {
      // {registerSW()}
  return (
    <div>
      <Navbar />
      <Sidebar>
        <Routes />
      </Sidebar>
    </div>
  );
};
// async function registerSW() {
//   if ("serviceWorker" in navigator) {
//     try {
//       await navigator.serviceWorker.register("./sw.js");
//     } catch (e) {
//       console.log(`SW registration failed`);
//     }
//   }
// }



export default App;
