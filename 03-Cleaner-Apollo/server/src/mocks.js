
const { MockList } = require('apollo-server');

module.exports = {
  Query: () => ({
    userList: () => new MockList([6, 9]),
    userFind: () => new MockList([6, 9]),
    userMatch: () => new MockList([6, 9]),
  }),
  Mutation: () => ({
    userCreate: () => ({name:'test123'}),
    userLogin: () => ({name:"test123"})
  }),
  Author: () => ({
    id: () => "user01",
    name: () => "test123",
    password: () => "test123"
  }),
};