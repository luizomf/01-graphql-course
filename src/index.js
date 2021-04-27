import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      hello: String
    }
  `,
});

server.listen(4003).then(({ url }) => {
  console.log(`Server listening on url ${url}`);
});
