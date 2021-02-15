
const { gql } = require('apollo-server');

const typeDefs = gql`

type Query {
  userList: [Author!]!
  userFind(name:String): [Author!]!
  userMatch(name:String): [Author!]!
}

type Mutation {
  createUser( name:String!, password:String! ): Author!
  loginUser( name:String!, password:String! ): Author!
}

type Author {
  id: ID!
  name: String!
  age: Int!
  password: String!
  token: String
}`;

module.exports = typeDefs;