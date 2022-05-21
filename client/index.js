import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { TransactionsProvider } from './src/ether/TransactionContext'
// import * as serviceWorker from "../serviceWorkerRegistration";



ReactDOM.render(
  <React.Fragment>
  <TransactionsProvider>
    <Provider store={store}>
      <Router history={history}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Router>
    </Provider>
  </TransactionsProvider>
  </React.Fragment>,
  document.getElementById("app")
);

//If you want your app to work offline and load faster, you can change
//unregister() to register() below. 
// serviceWorker.register();
