
const mongoose = require('mongoose');
const   bcrypt = require('bcrypt');
const   FACTOR = 10; // how hard to protect te password

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uuid:     { required: true, type: String, unique:true },
  name:     { required: true, type: String },
  password: { required: true, type: String },
  deposit:  { default:  0,    type: Number },
  provider: {
    github: String
  }
});

// Password1! => ads7a45sd47a5s4d7a6s5d75as436a5s34

UserSchema.pre( 'save', function(next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if ( ! user.isModified('password') ) return next();
  // generate a salt
  bcrypt.genSalt( FACTOR, function(err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash( user.password, salt, function(err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return new Promise( ( resolve ) => {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return resolve(false);
      resolve(isMatch);
    });
  }); 
};

UserSchema.methods.ownerJSON = function () {
  const  { id, name } = this;
  return { id, name };
};

const User = mongoose.model('User', UserSchema );

module.exports = User;
