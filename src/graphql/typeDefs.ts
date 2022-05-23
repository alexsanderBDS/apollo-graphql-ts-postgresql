import { gql } from "apollo-server";

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
    updateUserPassword(id: String!, password: String!): String!
    deleteUser(id: String!): String!
  }

  type Subscription {
    userCreated: User!
  }
`;

export default typeDefs;
