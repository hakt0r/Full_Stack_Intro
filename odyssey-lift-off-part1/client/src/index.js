import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles';
import Pages from './pages';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';

import { RestLink } from 'apollo-link-rest';

const graphLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });
const restLink  = new RestLink({ uri: "http://localhost:3000/" });
const allLinks  = ApolloLink.from([restLink,graphLink]);

const client = new ApolloClient({
  link: allLinks,
  cache: new InMemoryCache(),
 });

 ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Pages />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
