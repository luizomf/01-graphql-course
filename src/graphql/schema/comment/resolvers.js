const createComment = async (_, { data }) => {
  const { postId, comment } = data;
  console.log(postId, comment);
};

const user = async ({ user_id }, _, { dataSources }) => {
  const user = await dataSources.userApi.batchLoadById(user_id);
  return user;
};

export const commentResolvers = {
  Mutation: { createComment },
  Comment: { user },
};
