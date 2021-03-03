
const jwt      = require('jsonwebtoken');
const passport = require('passport');

const { JWT_SECRET } = process.env;

const jwtSign = user =>
  jwt.sign( { id: user._id }, JWT_SECRET );

const jwtAuth = passport.authenticate(
  'jwt',
  { session: false }
);

const sendLoginToken = ( { user }, res )=> {
  const token = jwtSign( user );
  res.send({
    token,
    user: user.ownerJSON()
  });
}

module.exports = {
  sendLoginToken,
  jwtSign,
  jwtAuth
}