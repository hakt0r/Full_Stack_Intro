
import React    from 'react';
import ReactDOM from 'react-dom';
import Pages    from './pages';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const graphLink = new HttpLink({ uri: '/graphql' });

const authLink = setContext(
  ( _, request ) => {
    const { headers } = request;
    const token = localStorage.getItem('token') || "";
    return { headers: { ...headers, authorization: token } };
  }
);

const authenticatedGraphLink = authLink.concat( graphLink );

const client = new ApolloClient({
  link: authenticatedGraphLink,
  cache: new InMemoryCache(),
 });

 ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Pages/>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
