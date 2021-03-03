
const _DB_ = 'db'.bold.blue;

const mongoose = require('mongoose');

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
};

module.exports = {
  connectToDb
};