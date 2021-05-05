import fetch from 'node-fetch';
import { getPosts } from './post/utils';
import { getUsers } from './user/utils';
import { makeUserDataLoader } from './user/dataloaders';

export const context = () => {
  return {
    userDataLoader: makeUserDataLoader(getUsers(fetch)),
    getUsers: getUsers(fetch),
    getPosts: getPosts(fetch),
  };
};
