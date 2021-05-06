const users = async (_, { input }, { dataSources }) => {
  const users = await dataSources.userApi.getUsers(input);
  return users;
};

const user = async (_, { id }, { dataSources }) => {
  const user = await dataSources.userApi.getUser(id);
  return user;
};

const posts = ({ id }, _, { dataSources }) => {
  return dataSources.postApi.batchLoadByUserId(id);
};

export const userResolvers = {
  Query: { user, users },
  User: { posts },
};
