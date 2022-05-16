import React from 'react';

import Routes from './Routes';
import { AuthProvider } from './context/AuthContext';

const App = () => {
      // {registerSW()}
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
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
