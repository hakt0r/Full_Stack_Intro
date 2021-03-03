
const    _XP_ = 'express'.bold.blue;
const express = require('express');
const     app = express();

const setupExpress = async () => {
  const PORT = process.env.PORT;
         app.use(express.json());
  await  app.listen( PORT );
  console.log( _XP_, 'listening'.green, PORT );
};

module.exports = {
  app,
  setupExpress
};
