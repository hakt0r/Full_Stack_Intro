
const mongoose = require('mongoose');

const connect = async () => {
  await mongoose.connect('mongodb://localhost/kittens',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  // const a1 = new Author({ name: 'anx', photo: 'catpic01.jpg' });
  // const a2 = new Author({ name: 'lea', photo: 'catpic02.jpg' });
  // a1.save();
  // a2.save();
}

const AuthorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  password: String,
  token: String
});

const Author = mongoose.model( 'Author', AuthorSchema );

module.exports = {
  connect,
  Author
}