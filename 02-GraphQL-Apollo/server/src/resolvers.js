
const { Author } = require('./db');

module.exports = {
  Query: {
    sayHello:                 () => "Hello Kitty!",
    userList: async ( parent, args, context ) => {
      // console.log(context.user);
      if ( ! context.user ) throw new Error('403');
      return await Author.find({});
    },
    userFind:  async ( _, args ) => await Author.find({name:args.name}),
    userMatch: async ( _, args ) => await Author.find({name:{$regex:args.name}})
  },
  Mutation: {
    createUser: async ( _, args ) => {
      const { name, password } = args;
      const author = new Author({name,password});
      await author.save();
      return author;
    },
    loginUser: async ( _, {name,password} ) => {
      const user = await Author.findOne({name});
      if ( user.password !== password ) throw new Error('404');
      user.token = 'sduiatyias5d46as5d468a5sd';
      await user.save();
      return user;
    }
  }
};