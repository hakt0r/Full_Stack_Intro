
require('colors');
require('dotenv').config();

const { connectToDb }   = require('./db');
const { setupExpress }  = require('./express');
const { app }           = require('./express');
const { setupPassport } = require('./auth');
const { jwtAuth }       = require('./auth');

async function init () {
  await connectToDb();
  await setupExpress();
  await setupPassport();
  // routes that are accesible without a token
  require('./route/public');
  // enable authentication
  app.use( jwtAuth );
  // every other request to our backend (except auth / passport)
  // is required to be authenticated
  require('./route');
}

init();