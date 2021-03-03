
const           passport = require('passport');
const               User = require('../model/user.model');
const            { app } = require('../express'); 
const { sendLoginToken } = require('./tools');

const { GITHUB_CLIENT, GITHUB_SECRET } = process.env;

module.exports = () => {

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

  app.get(
    '/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] })
  );

  app.get(
    '/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    sendLoginToken
  );

}