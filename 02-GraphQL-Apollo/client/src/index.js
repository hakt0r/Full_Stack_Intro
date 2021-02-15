
import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles';
import Pages from './pages';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { RestLink } from 'apollo-link-rest';

const graphLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authLink = setContext(
  ( _, request ) => {
    const { headers } = request;
    const token = localStorage.getItem('token') || "";
    return { headers: { ...headers, authorization: token } };
  }
);

const authenticatedGraphLink = authLink.concat( graphLink );

const restLink  = new RestLink({ uri: "http://localhost:3000/" });
const allLinks  = ApolloLink.from([authenticatedGraphLink,restLink]);

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
