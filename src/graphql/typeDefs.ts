const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar DateTime

  type User {
    id: ID!
    email: String!
    password: String!
    createdat: DateTime!
    updatedat: DateTime
    token: String
  }

  input userCreate {
    email: String!
    password: String!
  }

  type Query {
    getAllUsers: [User!]!
    getUser(id: String!): User!
  }
  type Mutation {
    createUser(input: userCreate!): String!
  }
`;

export default typeDefs;
