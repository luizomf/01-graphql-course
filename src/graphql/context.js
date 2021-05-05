import fetch from 'node-fetch';
import { getPosts } from './post/utils';
import { getUsers } from './user/utils';
import { makeUserDataLoader } from './user/dataloaders';
import { makePostDataLoader } from './post/dataloaders';

const _getUsers = getUsers(fetch);
const _getPosts = getPosts(fetch);

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(_getUsers),
    postDataLoader: makePostDataLoader(_getPosts),
    getUsers: _getUsers,
    getPosts: _getPosts,
  };
};
