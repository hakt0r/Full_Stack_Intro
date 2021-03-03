
const    passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const        User = require('../model/user.model');

const { JWT_SECRET } = process.env;

module.exports = () => { 

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

}