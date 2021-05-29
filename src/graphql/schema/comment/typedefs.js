import { gql } from 'apollo-server-core';

export const commentTypedefs = gql`
  extends type Mutation {
    createComment(data: CreateCommentInput!): Comment!
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
