
require('colors');
require('dotenv').config();

// Set up Database

const _DB_     = 'db'.bold.blue;

const mongoose = require('mongoose');
const User     = require('./model/user.model');

const connectToDb = async ()=> {
  const DB = process.env.DB;
  try {
    await mongoose.connect( DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    global.$db = mongoose.connection;
    console.log( _DB_, 'connected'.green, DB )
  } catch (error){
    console.error( _DB_, 'error'.red.bold, error );
  }
}

// Set up Express

const _XP_    = 'express'.bold.blue;
const express = require('express');

const setupExpress = async () => {
  const PORT = process.env.PORT;
  const  app = express();
         app.use(express.json());

  app.post('/register', async (req,res)=> {
    const { body:{ name, password } } = req;
    if ( await User.findOne({name}) )
      return res.status(401).send({message:'Name already taken'});
    const user = new User({ name, password });
    await user.save();
  });

  await app.listen( PORT );
  
  console.log( _XP_, 'listening'.green, PORT );
  
  return app;
}

// Passport

const { JWT_SECRET } = process.env;
const jwt     = require('jsonwebtoken');
const jwtSign = user => jwt.sign( { id: user._id }, JWT_SECRET );

const setupPassport = async (app)=> {
  const passport = require('passport');

  app.use( passport.initialize() );
  
  passport.serializeUser(function( user, done ) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  const LocalStrategy = require('passport-local').Strategy;
  const localAuthentication = async ( name, password, done ) => {
    try {
      const  user = await User.findOne({ name });
      if ( ! user ) return done(null, false, { message: 'Authorization Failed!' });
      if ( ! await user.comparePassword( password ) )
        return done( null, false, { message: 'Authorization Failed!' });
      return   done( null, user ); 
    } catch ( err ) {
      done(err);
    }
  }

  const localStrategy = new LocalStrategy({ usernameField: "name" },localAuthentication);

  app.post(
    '/auth/login',
    passport.authenticate(
      'local', { session:false }
    ), ( { user }, res )=> {
      const token = jwtSign( user );
      res.send({
        token,
        user: user.ownerJSON()
      });
    }
  );

  passport.use(localStrategy);

};

// Init function

async function init () {
  await connectToDb();
  const app = await setupExpress();
  await setupPassport(app);
}

init();