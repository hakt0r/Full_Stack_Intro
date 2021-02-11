
import React from 'react';
import { Layout } from '../components';
import { gql, useQuery } from '@apollo/client';

export const USERS = gql`
query allUsers {
  users @rest( type: "User", path:"/users" ) {
    age
  }
}
`;

const Users = () => {
  const { loading, error, data } = useQuery(USERS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return <Layout grid>{JSON.stringify(data)}</Layout>;
};

export default Users;
