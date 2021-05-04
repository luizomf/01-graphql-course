import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql/schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4003).then(({ url }) => {
  console.log(`Server listening on url ${url}`);
});
