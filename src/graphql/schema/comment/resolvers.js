import { PubSub } from 'apollo-server';
import { checkIsLoggedIn } from '../login/utils/login-functions';

export const pubSub = new PubSub();
export const CREATED_COMMENT_TRIGGER = 'CREATED_COMMENT';

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

const createdComment = {
  subscribe: () => {
    return pubSub.asyncIterator(CREATED_COMMENT_TRIGGER);
  },
};

export const commentResolvers = {
  Mutation: { createComment },
  Subscription: { createdComment },
  Comment: { user },
};
