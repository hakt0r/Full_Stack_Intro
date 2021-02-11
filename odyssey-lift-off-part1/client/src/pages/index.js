import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Tracks from './tracks';
import Users from './users';

export default function Pages() {
  return <>
    <Users/>
    <Router primary={false} component={Fragment}>
      <Tracks path="/" />
    </Router>
  </>;
}
