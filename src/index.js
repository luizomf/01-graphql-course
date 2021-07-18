import { ApolloServer } from 'apollo-server';

import { knex } from './knex/';

import { context } from './graphql/context';

import { PostsApi } from './graphql/schema/post/datasources';
import { UsersApi } from './graphql/schema/user/datasources';

import { resolvers, typeDefs } from './graphql/schema';
import { LoginApi } from './graphql/schema/login/datasources';

import { CommentSQLDataSource } from './graphql/schema/comment/datasources';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => {
    return {
      postApi: new PostsApi(),
      userApi: new UsersApi(),
      loginApi: new LoginApi(),
      commentDb: new CommentSQLDataSource(knex),
    };
  },
  uploads: false,
  cors: {
    origin: ['https://focused-bartik-8938e3.netlify.app'],
    credentials: true,
  },
  subscriptions: {
    onConnect: (connectionParams, ws, _context) => {
      return {
        req: ws.upgradeReq,
      };
    },
    path: '/',
    keepAlive: 5000,
  },
});

const port = process.env.PORT || 4003;
server.listen(port).then(({ url }) => {
  console.log(`Server listening on url ${url}`);
});
