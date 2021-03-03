
const           passport = require('passport');
const      LocalStrategy = require('passport-local').Strategy;
const               User = require('../model/user.model');
const            { app } = require('../express'); 
const { sendLoginToken } = require('./tools');

module.exports = () => {

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

  const localStrategy = new LocalStrategy(
    { usernameField: "name" },
    localAuthentication
  );

  passport.use( localStrategy );

  app.post(
    '/auth/login',
    passport.authenticate( 'local', { session:false } ),
    sendLoginToken
  );

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
};