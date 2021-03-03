

const {
  setupPassport
} = require('./init');

const {
  sendLoginToken,
  jwtSign,
  jwtAuth
} = require('./tools');

module.exports = {
  jwtSign,
  jwtAuth,
  sendLoginToken,
  setupPassport
};
