
import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const USERS = gql`
query allUsers {
  userList {
    name
  }
}`;

const Users = () => {
  const { loading, error, data } = useQuery(USERS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return JSON.stringify(data);
};

export default Users;
