
const { connect, Author } = require('./db');

const { ApolloServer } = require('apollo-server-express');

const typeDefs  = require('./schema');
const mocks     = require('./mocks');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  playground: true,
  resolvers,
  context: async ({req})=> {
    const token = req.headers.authorization;
    if ( token ){
      const user = await Author.findOne({token});
      return { token, user };
    } else {
      return { user: false };
    }
  }
});

const express = require('express');
const app     = express();

server.applyMiddleware({ app, path: '/graphql' });

app.listen(4001, async ()=> {
  await connect();
  console.log(` 🔉 Express listening on port 4001`);
});
