
const { Author } = require('./db');

module.exports = {
  Query: {
    sayHello:                 () => "Hello Kitty!",
    userList:  async          () => await Author.find(),
    userFind:  async ( _, args ) => await Author.find({name:args.name}),
    userMatch: async ( _, args ) => await Author.find({name:{$regex:args.name}})
  },
  Mutation: {
    createUser: async ( _, args ) => {
      const { name } = args;
      const author = new Author({name});
      await author.save();
      return author;
    }
  }
};