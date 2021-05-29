import { checkIsLoggedIn } from '../login/utils/login-functions';

const createComment = async (_, { data }, { dataSources, loggedUserId }) => {
  checkIsLoggedIn(loggedUserId);
  const { postId, comment } = data;

  await dataSources.postApi.getPost(postId); // throws if post does not exist

  return dataSources.commentDb.create({
    postId,
    comment,
    userId: loggedUserId,
  });
};

const user = async ({ user_id }, _, { dataSources }) => {
  const user = await dataSources.userApi.batchLoadById(user_id);
  return user;
};

export const commentResolvers = {
  Mutation: { createComment },
  Comment: { user },
};
