
const { AuthenticationError } = require('apollo-server');
const { Author } = require('./db');

const createUser = async ( _, args ) => {
  const { name, password } = args;
  const user = await Author.findOne({name});
  if ( user ) throw new AuthenticationError('401');
  const author = new Author({name,password});
  await author.save();
  return author;
};

const loginUser = async ( _, {name,password} ) => {
  const user = await Author.findOne({name});
  if ( user.password !== password ) throw new AuthenticationError('404');
  user.token = 'sduiatyias5d46as5d468a5sd';
  await user.save();
  return user;
};

module.exports = {
  Query: {
    userList: async ( parent, args, context ) => {
      if ( ! context.user ) throw new AuthenticationError();
      // if ( context.user.role !== 'user' ) throw new AuthenticationError();
      return await Author.find({});
    },
    userFind:  async ( _, args ) => await Author.find({name:args.name}),
    userMatch: async ( _, args ) => await Author.find({name:{$regex:args.name}}),
    helloWorld: ()=> "Hello, World!!!11111elf1eleven"
  },
  Mutation: {
    createUser,
    loginUser
  }
};