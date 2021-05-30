import { gql } from 'apollo-server-core';

export const commentTypedefs = gql`
  extend type Mutation {
    createComment(data: CreateCommentInput!): Comment!
  }

  extend type Subscription {
    createdComment(test: String): Comment!
  }

  type Comment {
    id: ID!
    comment: String!
    user: User!
    createdAt: String!
  }

  input CreateCommentInput {
    comment: String!
    postId: String!
  }
`;
