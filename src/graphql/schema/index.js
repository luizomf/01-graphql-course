import { gql } from 'apollo-server-core';

import { apiFiltersResolvers } from './api-filters/resolvers';
import { apiFiltersTypeDefs } from './api-filters/typedefs';

import { commentResolvers } from './comment/resolvers';
import { commentTypedefs } from './comment/typedefs';

import { loginResolvers } from './login/resolvers';
import { loginTypedefs } from './login/typesdefs';

import { postResolvers } from './post/resolvers';
import { postTypeDefs } from './post/typedefs';

import { userResolvers } from './user/resolvers';
import { userTypeDefs } from './user/typedefs';

const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }

  type Mutation {
    _empty: Boolean
  }

  type Subscription {
    _empty: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _empty: () => true,
  },

  Mutation: {
    _empty: () => true,
  },
};

export const typeDefs = [
  rootTypeDefs,
  userTypeDefs,
  postTypeDefs,
  apiFiltersTypeDefs,
  loginTypedefs,
  commentTypedefs,
];
export const resolvers = [
  rootResolvers,
  userResolvers,
  postResolvers,
  apiFiltersResolvers,
  loginResolvers,
  commentResolvers,
];
