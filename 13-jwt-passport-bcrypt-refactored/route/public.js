
const { app } = require('../express');

app.get('/', (req,res) => {
  res.send({message:'OpenBank/2.0'});
});
