
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



  const sendLoginToken = ( { user }, res )=> {
    const token = jwtSign( user );
    res.send({
      token,
      user: user.ownerJSON()
    });
  }



  const LocalStrategy = require('passport-local').Strategy;
  const localAuthentication = async ( name, password, done ) => {
    try {
      const  uuid = `${name}@local`;
      const  user = await User.findOne({ name, uuid });
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
    passport.authenticate( 'local', { session:false } ),
    sendLoginToken
  );

  passport.use( localStrategy );

  app.post('/register', async (req,res)=> {
    const { body:{ name, password } } = req;
    const uuid = `${name}@local`;
    if ( await User.findOne({uuid,name}) )
      return res.status(401).send({message:'Name already taken'});
    const user = new User({ name, password, uuid });
    await user.save();
    req.user = user;
    sendLoginToken(req,res);
  });



  const JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt  = require('passport-jwt').ExtractJwt;
  
  const opts = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey:    JWT_SECRET
  }

  const jwtStrategy = new JwtStrategy( opts, function( jwt_payload, done) {
    User.findById( jwt_payload.id, function(err, user) {
      if ( err )  return done( err,  false );
      if ( user ) return done( null, user  );
      else        return done( null, false );
    });
  });

  passport.use( jwtStrategy );

  const jwtAuth = passport.authenticate('jwt', { session: false });



  const { GITHUB_CLIENT, GITHUB_SECRET } = process.env;

  const GitHubStrategy = require('passport-github2').Strategy;

  const githubOpts = {
    clientID:     GITHUB_CLIENT,
    clientSecret: GITHUB_SECRET,
    callbackURL: "http://localhost:5099/auth/github/callback"
  };

  const gitHubStrategy = new GitHubStrategy( githubOpts,
    async function(accessToken, refreshToken, profile, done) {
      const uuid = `${profile.id}@github`;
      console.log('! github !', uuid)
      let user = await User.findOne({
        uuid,
        provider: { github: profile.id }
      });
      if ( ! user ) {
        user = new User({
          uuid,
          name: profile.username,
          password: accessToken,
          provider: {
            github: profile.id
          }
        });
        await user.save();
      }
      return done(null, user);
    }
  )

  passport.use( gitHubStrategy );

  app.get( '/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

  app.get(
    '/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    sendLoginToken
  );



  app.use( jwtAuth );

  app.get('/deposit', (req,res) => {
    console.log(req.headers.authorization)
    if ( ! req.user ) return res.status(403).send({message:'Forbidden'});
    res.send({depostit:req.user.deposit});
  });

};

// Init function

async function init () {
  await connectToDb();
  const app = await setupExpress();
  await setupPassport(app);
}

init();