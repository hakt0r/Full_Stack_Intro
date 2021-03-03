
const { app } = require('../express');

app.get('/deposit', (req,res) => {
  if ( ! req.user ) return res.status(403).send({message:'Forbidden'});
  res.send({depostit:req.user.deposit});
});
