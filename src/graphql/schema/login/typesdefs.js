import { gql } from 'apollo-server-core';

export const loginTypedefs = gql`
  extend type Mutation {
    login(data: LoginInput!): Login!
    logout(userName: String!): Boolean!
  }

  input LoginInput {
    userName: String!
    password: String!
  }

  type Login {
    userId: String!
    token: String!
  }
`;
