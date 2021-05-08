// Query resolvers
const post = async (_, { id }, { dataSources }) => {
  const post = dataSources.postApi.getPost(id);
  return post;
};

const posts = async (_, { input }, { dataSources }) => {
  const posts = dataSources.postApi.getPosts(input);
  return posts;
};

// Mutation resolvers
const createPost = async (_, args, { dataSources }) => {
  console.log(args);
  return {
    id: '601',
    title: 'Nihil numquam eum iure consequatur.',
    body: 'Menor',
    userId: '502',
    indexRef: 19,
    createdAt: '2017-04-26T19:39:05.420Z',
  };
};

// Field resolver
const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadById(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Mutation: { createPost },
  Post: { user },
};
