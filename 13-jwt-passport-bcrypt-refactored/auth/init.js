
const   passport = require('passport');
const    { app } = require('../express'); 
const       User = require('../model/user.model');
const  localInit = require('./local');
const    jwtInit = require('./jwt');
const githubInit = require('./github');

const setupPassport = async ()=> {

  app.use( passport.initialize() );
  
  passport.serializeUser(function( user, done ) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  localInit();
  jwtInit();
  githubInit();
};

module.exports = {
  setupPassport
};