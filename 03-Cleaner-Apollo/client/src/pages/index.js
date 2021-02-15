import React, { Fragment } from 'react';
import { Router } from '@reach/router';

import Users from './users';
import Register from './register';
import Login from './login';

export default function Pages() {
  return <>
    <Users/>
    <Register/>
    <Login/>
  </>;
}
