import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { TransactionsProvider } from './src/context/TransactionContext'
ReactDOM.render(
  <TransactionsProvider>
    <Provider store={store}>
      <Router history={history}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Router>
    </Provider>
  </TransactionsProvider>,
  document.getElementById("app")
);
