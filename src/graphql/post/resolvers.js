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
const createPost = async (_, { data }, { dataSources }) => {
  return dataSources.postApi.createPost(data);
};

const updatePost = async (_, { postId, data }, { dataSources }) => {
  return dataSources.postApi.updatePost(postId, data);
};

// Field resolver
const user = async ({ userId }, _, { dataSources }) => {
  return dataSources.userApi.batchLoadById(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Mutation: { createPost, updatePost },
  Post: { user },
};
