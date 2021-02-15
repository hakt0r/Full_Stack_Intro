
import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const USERS = gql`
query allUsers {
  users @rest( type: "User", path:"/users" ) {
    name
  }
}
`;

export const GQLUSERS = gql`
query allUsers {
  userList {
    name
  }
}
`;

const Users = () => {
  const { loading, error, data } = useQuery(GQLUSERS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return JSON.stringify(data);
};

export default Users;
