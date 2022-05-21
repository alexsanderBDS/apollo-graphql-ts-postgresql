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

  type Query {
    getAllUsers: [User!]!
  }

  input userCreate {
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: userCreate!): String!
  }
`;

export default typeDefs;
