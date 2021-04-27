import { ApolloServer, gql } from 'apollo-server';

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      user: User!
      users: [User!]!
    }

    type User {
      id: ID!
      userName: String!
    }
  `,
  resolvers: {
    Query: {
      user: () => {
        return {
          id: 'asd8708',
          userName: 'otaviomiranda',
        };
      },
      users: () => {
        return [
          {
            id: '1',
            userName: 'otaviomiranda1',
          },
          {
            id: '2',
            userName: 'otaviomiranda2',
          },
          {
            id: '3',
            userName: 'otaviomiranda3',
          },
        ];
      },
    },
  },
});

server.listen(4003).then(({ url }) => {
  console.log(`Server listening on url ${url}`);
});
