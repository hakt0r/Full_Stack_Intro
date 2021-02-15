const { connect } = require('./db');

const { ApolloServer } = require('apollo-server-express');
const typeDefs  = require('./schema');
const mocks     = require('./mocks');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  playground: true,
  resolvers
});

const express = require('express');
const app     = express();

server.applyMiddleware({ app, path: '/graphql' });

app.get('/users',(req,res)=> {
  res.send([
    { name:'anx', age:37 },
    { name:'lea', age:5  }
  ]);
});

app.listen(4001, async ()=> {
  await connect();
  console.log(`    🔉  Express listening on port 4001`);
});
