import config from './config';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// It just works
// Idc why
// Running out of time
const createUploadLink = require('apollo-upload-client/createUploadLink.mjs').default;

const httpLink = createHttpLink({
  uri: config.apiUrl + '/graphql',
});

const headerLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Apollo-Require-Preflight': 'true'
    },
  };
});

const uploadLink = createUploadLink({
  uri: config.apiUrl + '/graphql',
});

const client = new ApolloClient({
  link: headerLink.concat(uploadLink).concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
