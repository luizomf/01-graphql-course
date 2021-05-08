import { ValidationError } from 'apollo-server-errors';

export const createPostFn = async (postData, dataSource) => {
  const postInfo = await createPostInfo(postData, dataSource);
  const { title, body, userId } = postInfo;

  if (!title || !body || !userId) {
    throw new ValidationError('You have to send title, body and userId');
  }

  return await dataSource.post('', { ...postInfo });
};

export const updatePostFn = async (postId, postData, dataSource) => {
  if (!postId) {
    throw new ValidationError('Missing postId');
  }

  const { title, body, userId } = postData;

  if (typeof title !== 'undefined') {
    if (!title) {
      throw new ValidationError('title missing');
    }
  }

  if (typeof body !== 'undefined') {
    if (!body) {
      throw new ValidationError('body missing');
    }
  }

  if (typeof userId !== 'undefined') {
    if (!userId) {
      throw new ValidationError('userId missing');
    }
    await userExists(userId, dataSource);
  }

  return dataSource.patch(postId, { ...postData });
};

const userExists = async (userId, dataSource) => {
  try {
    await dataSource.context.dataSources.userApi.get(userId);
  } catch (e) {
    throw new ValidationError(`User ${userId} does not exist`);
  }
};

const createPostInfo = async (postData, dataSource) => {
  const { title, body, userId } = postData;

  await userExists(userId, dataSource);

  const indexRefPost = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });

  const indexRef = indexRefPost[0].indexRef + 1;

  return {
    title,
    body,
    userId,
    indexRef,
    createdAt: new Date().toISOString(),
  };
};
