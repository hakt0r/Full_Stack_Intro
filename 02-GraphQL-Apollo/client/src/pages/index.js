import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Tracks from './tracks';
import Users from './users';
import Register from './register';
import Login from './login';

export default function Pages() {
  return <>
    <Users/>
    <Register/>
    <Login/>
    <Router primary={false} component={Fragment}>
      <Tracks path="/" />
    </Router>
  </>;
}
